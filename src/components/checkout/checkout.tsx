"use client";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/store/cartStore";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countries from "world-countries";

function Checkout() {
  const { items, removeItem, increaseQty, decreaseQty } = useCart();

  const totalPrice = (items || []).reduce(
    (total: number, item: any) =>
      total +
      (Number(item.qty ?? 0) || 0) * (Number(item.discountPrice ?? 0) || 0),
    0
  );

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
      <div className="wrapper grid grid-cols-2 gap-5 h-[650px]">
        <div>
          <h2 className="text-2xl my-5">Billing Details</h2>
          <form action="">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  required
                  placeholder="Enter Your First Name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  required
                  placeholder="Enter Your Last Name"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="country">Country</label>
                <select
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  name="country"
                  id="country"
                  required
                  defaultValue={"IE"}
                >
                  {countries.map((item, index) => (
                    <option key={index} value={item.cca2}>
                      {item.name.common}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="townCity">Town / City</label>
                <input
                  type="text"
                  id="townCity"
                  required
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  placeholder="Town / City"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="postcode">Postcode / ZIP</label>
                <input
                  type="text"
                  id="postcode"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  placeholder="Enter Your Postcode / ZIP"
                  required
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="streetAddress">Street Address</label>
                <input
                  type="text"
                  id="streetAddress"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  id="phone"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="orderNotes">Order Notes (Optional)</label>
                <textarea
                  rows={4}
                  id="orderNotes"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="border border-[var(--line)] rounded-md p-2 outline-none focus:border-[var(--primary)] transition"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="h-full">
          <h2 className="text-2xl my-5">Your Order</h2>
          {items ? (
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
        <div className="border-t flex items-center justify-between py-2 w-full">
          <h2 className="text-xl">Total : {formatPrice(totalPrice)}</h2>
          <Link
            href="/checkout"
            className="px-3 py-2 bg-[var(--primary)] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-[var(--btn-hover-bg)]"
          >
            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
