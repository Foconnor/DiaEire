"use client";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

interface CartProps {
  handleCart: () => void;
  isCartOpen: boolean;
}

const Cart: React.FC<CartProps> = ({ handleCart, isCartOpen }) => {
  const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cartItems, setCartItems] = React.useState<any[]>(existingCart);

  console.log(cartItems);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * Number(item.discountPrice),
    0
  );

  const handleRemoveItem = (ItemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== ItemId));
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems.filter((item) => item.id !== ItemId))
    );
  };

  function handleQuantityPlus(itemId: string) {
    setCartItems(
      cartItems.map((item: any) => {
        if (item.id === itemId) {
          item.quantity += 1;
          item.discountPrice *= item.quantity;
        }
        return item;
      })
    );
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  function handleQuantityMinus(itemId: string) {
    setCartItems(
      cartItems.map((item: any) => {
        if (item.id === itemId) {
          item.quantity -= 1;
          item.discountPrice /= item.quantity;
        }
        return item;
      })
    );
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  return (
    <div
      className={`fixed right-0 top-0 w-[350px] h-[100vh] bg-white shadow-lg z-50 p-5 transition-all ease-in-out duration-300 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="border-b flex items-center justify-between pb-2">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer hover:opacity-70 transition"
          size="lg"
          onClick={handleCart}
        />
      </div>

      <div className="border-t flex items-center justify-between py-2 absolute bottom-0 w-[88%]">
        <h2 className="text-xl">Total : {formatPrice(totalPrice)}</h2>
        <button className="px-2 py-1 bg-[var(--primary)] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-[var(--btn-hover-bg)]">
          <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
          Checkout
        </button>
      </div>

      {existingCart ? (
        <div className="py-5 text-gray-500 text-center">
          {cartItems.map((item: any) => (
            <div
              key={item.id}
              className="border border-[var(--line)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex justify-between items-center mb-2 relative"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="absolute top-3 right-3 cursor-pointer"
                size="lg"
                onClick={() => {
                  handleRemoveItem(item.id);
                }}
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-1/3 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback.jpg";
                }}
              />

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
                        handleQuantityMinus(item.id);
                      }}
                    >
                      &minus;
                    </button>

                    <span className="text-center px-3 text-black font-medium border border-gray-300 py-1 border-x-0 outline-none">
                      {item.quantity}
                    </span>

                    <button
                      className="flex items-center justify-center text-black hover:bg-gray-300 border-l border-gray-300 px-2 text-xl border rounded-r-2xl cursor-pointer bg-gray-200 transition-all duration-200 ease-in-out"
                      onClick={() => {
                        handleQuantityPlus(item.id);
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
  );
};

export default Cart;
