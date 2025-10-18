"use client";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/store/cartStore";
import {
  faCartShopping,
  faClose,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countries from "world-countries";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

function Checkout() {
  const { items, removeItem, increaseQty, decreaseQty, clearCart } = useCart();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isBorderRed, setBorderRed] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [billingDetails, setBillingDetails] = React.useState({
    firstName: "",
    lastName: "",
    country: "IE",
    townCity: "",
    postcode: "",
    streetAddress: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  console.log(items);

  const totalPrice = (items || []).reduce(
    (total: number, item: any) =>
      total +
      (Number(item.qty ?? 0) || 0) * (Number(item.discountPrice ?? 0) || 0),
    0
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/shop-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          customerInfo: {
            name: `${billingDetails.firstName} ${billingDetails.lastName}`.trim(),
            email: billingDetails.email,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create payment intent");
      }

      const clientSecret = data.clientSecret;
      if (!clientSecret) {
        throw new Error("Missing client secret from payment intent");
      }

      if (!stripe || !elements) {
        toast.error("Stripe has not loaded. Try again in a moment.");
        setLoading(false);
        return;
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        toast.error("Card element not found.");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: `${billingDetails.firstName} ${billingDetails.lastName}`.trim(),
            email: billingDetails.email,
            phone: billingDetails.phone,
            address: {
              city: billingDetails.townCity,
              country: billingDetails.country,
              postal_code: billingDetails.postcode,
              line1: billingDetails.streetAddress,
            },
          },
        },
      });

      if (result.error) {
        toast.error(
          result.error.message || "Payment failed. Please try again."
        );
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful! 🎉");
        try {
          await addDoc(collection(db, "orders"), {
            ...billingDetails,
            nameLowerCase:
              `${billingDetails.firstName} ${billingDetails.lastName}`.toLowerCase(),
            productsIds: items.map((item: any) => item.id),
            paymentStatus: "paid",
            status: "processing",
            createdAt: new Date().toISOString(),
          });
          clearCart();
          router.push("/shop");
          toast.success("Order placed successfull 🎉");
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error submitting form:", error.message);
          } else {
            console.error("Unknown error submitting form:", error);
          }
        }

        setIsModalOpen(false);
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(err?.message || "An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModel = () => {
    if (
      (billingDetails.firstName &&
        billingDetails.lastName &&
        billingDetails.country &&
        billingDetails.email &&
        billingDetails.phone &&
        billingDetails.postcode &&
        billingDetails.streetAddress &&
        billingDetails.townCity) === ""
    ) {
      toast.error("Please fill the required fields");
      setBorderRed(true);
    } else {
      setBorderRed(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-full">
            <Link href="/shop" className="underline">
              Shop
            </Link>{" "}
            \ Checkout
          </h1>
        </div>
      </div>
      <div className="wrapper grid md:grid-cols-2 grid-cols-1 gap-5 md:h-[650px]">
        <div>
          <h2 className="text-2xl my-5">Billing Details</h2>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  required
                  placeholder="Enter Your First Name"
                  value={billingDetails.firstName}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  required
                  placeholder="Enter Your Last Name"
                  value={billingDetails.lastName}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  name="country"
                  id="country"
                  required
                  value={billingDetails.country}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      country: e.target.value,
                    })
                  }
                >
                  {countries.map((item, index) => (
                    <option key={index} value={item.cca2}>
                      {item.name.common}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="townCity">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="townCity"
                  required
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  placeholder="Town / City"
                  value={billingDetails.townCity}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      townCity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="postcode">
                  Postcode / ZIP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="postcode"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  placeholder="Enter Your Postcode / ZIP"
                  value={billingDetails.postcode}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      postcode: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="streetAddress">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  placeholder="Enter Your Address"
                  value={billingDetails.streetAddress}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      streetAddress: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  placeholder="Enter Your Phone"
                  value={billingDetails.phone}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className={`border rounded-md p-2 outline-none focus:border-[var(--primary)] transition ${
                    isBorderRed ? "border-red-500" : "border-[var(--line)]"
                  }`}
                  placeholder="Enter Your Email"
                  value={billingDetails.email}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="orderNotes">Order Notes (Optional)</label>
                <textarea
                  rows={4}
                  id="orderNotes"
                  name="orderNotes"
                  value={billingDetails.orderNotes}
                  onChange={(e) =>
                    setBillingDetails({
                      ...billingDetails,
                      orderNotes: e.target.value,
                    })
                  }
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full">
          <h2 className="text-2xl my-5">Your Order</h2>
          {items && items.length ? (
            <div className="pt-5 text-gray-500 text-center overflow-auto h-[550px]">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="border border-[var(--line)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex justify-between items-center mb-2 relative"
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="absolute top-3 right-3 cursor-pointer"
                    size="lg"
                    onClick={() => {
                      removeItem(item.id);
                    }}
                  />
                  <div className="flex items-center justify-center w-1/3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[140px] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback.jpg";
                      }}
                    />
                  </div>
                  <div className="p-5 bg-[var(--grey)] w-2/3">
                    <h2 className="text-lg font-semibold text-[var(--primary)] mb-2 text-start">
                      {item.name}
                    </h2>
                    <div className="flex gap-3 mb-3">
                      <span className="text-xl font-bold text-[var(--btn-black)]">
                        {formatPrice(Number(item.discountPrice))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <button
                          className="flex items-center justify-center hover:bg-gray-300 border-r border-gray-300 px-2 text-xl border rounded-l-2xl cursor-pointer bg-gray-200 text-black transition-all duration-200 ease-in-out"
                          type="button"
                          onClick={() => {
                            decreaseQty(item.id);
                          }}
                        >
                          &minus;
                        </button>

                        <span className="text-center px-3 text-black font-medium border border-gray-300 py-1 border-x-0 outline-none">
                          {item.qty}
                        </span>

                        <button
                          className="flex items-center justify-center text-black hover:bg-gray-300 border-l border-gray-300 px-2 text-xl border rounded-r-2xl cursor-pointer bg-gray-200 transition-all duration-200 ease-in-out"
                          onClick={() => {
                            increaseQty(item.id);
                          }}
                          type="button"
                        >
                          &#43;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="py-5 text-gray-500 text-center">
                Your cart is empty.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="wrapper">
        <div className="border-t flex items-center justify-between py-2 w-full md:mt-0 mt-5">
          <h2 className="text-xl">Total : {formatPrice(totalPrice)}</h2>
          <button
            className="px-3 py-2 bg-[var(--primary)] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-[var(--btn-hover-bg)]"
            onClick={handleOpenModel}
          >
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
            Place Order
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-lg p-8 max-w-[400px] w-[90%] relative overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

            <label className="block mb-2 font-medium">Card Details</label>
            <div className="border border-[var(--line)] rounded-md p-2 mb-6">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!stripe || loading}
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-md w-full cursor-pointer hover:bg-[var(--btn-hover-bg)]"
            >
              {loading ? "Processing..." : `Pay ${formatPrice(totalPrice)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
