"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFetchProducts } from "@/hooks/useFetchProduct";

interface ShopItemType {
  id: string;
  name: string;
  category: string;
  price: string;
  discountPrice: string;
  stock: string;
  image: string;
  description: string;
}

export default function ShopItem() {
  const { products } = useFetchProducts();
  const pathname = usePathname();
  const itemId = pathname.split("/").pop();

  const [shopItems, setShopItems] = useState([] as ShopItemType[]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setShopItems(products);
    }
  }, [products]);

  const item = shopItems.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Product not found
        </h2>
        <p className="text-gray-500">Please check the product link again.</p>
      </div>
    );
  }

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  return (
    <>
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-full">
            <Link href="/shop" className="underline">
              Shop
            </Link>{" "}
            \ {item.name}
          </h1>
        </div>
      </div>
      <div className="wrapper">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 py-14 items-center">
          <img
            src={item.image}
            alt={item.name}
            className="max-w-[400px] object-contain mx-auto"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-[var(--primary)]">
              {item.name}
            </h1>
            <p className="text-gray-600">{item.description}</p>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-[var(--btn-black)]">
                {formatPrice(Number(item.discountPrice))}
              </span>
              <span className="text-red-500 line-through">
                {formatPrice(Number(item.price))}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              <span>Category:</span>{" "}
              <span className="font-medium">{item.category}</span>
            </div>

            <div className="text-sm text-gray-500">
              <span>Stock:</span>{" "}
              <span
                className={`font-medium ${
                  Number(item.stock) > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {Number(item.stock) > 0
                  ? `${item.stock} available`
                  : "Out of stock"}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <button className="bg-[var(--btn-black)] text-white px-6 py-3 rounded-lg hover:opacity-80 cursor-pointer transition-all ease-in-out duration-300">
                Add to Cart
              </button>
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--btn-hover-bg)] cursor-pointer transition-all ease-in-out duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
