"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import { Product as ShopItemType } from "@/types/types";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/store/cartStore";
import Cart from "./cart";
import Shop from "../shop";

export default function ShopItem() {
  const addItem = useCart((state) => state.addItem);
  const setIsCartOpen = useCart((state) => state.openCart);
  const { products, loading } = useFetchProducts();
  const pathname = usePathname();
  const itemId = pathname.split("/").pop();

  const [shopItems, setShopItems] = useState([] as ShopItemType[]);
  const [itemSameCate, setItemSameCate] = useState([] as ShopItemType[]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setShopItems(products);
    }
  }, [products]);

  const item = shopItems.find((i) => i.id === itemId);
  useEffect(() => {
    if (item && shopItems.length > 0) {
      const sameCategoryItems = shopItems.filter(
        (i) => i.category === item.category && i.id !== item.id
      );
      setItemSameCate(sameCategoryItems);
    }
  }, [item, shopItems]);

  return (
    <>
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1rem_+_1.9vw)] md:text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-full">
            <Link href="/shop" className="underline">
              Shop
            </Link>{" "}
            \ {item?.name}
          </h1>
        </div>
      </div>
      <div className="wrapper">
        {loading ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 py-14 items-center animate-pulse border-b border-[var(--line)] mb-10">
            <div className="w-full h-[300px] bg-gray-200 rounded-xl mx-auto"></div>

            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>

              <div className="h-4 bg-gray-200 rounded w-1/3"></div>

              <div className="h-4 bg-gray-200 rounded w-1/4"></div>

              <div className="flex items-center gap-5">
                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 py-14 items-center border-b border-black mb-10">
            <img
              src={item?.image}
              alt={item?.name}
              height={300}
              className="max-w-[400px] h-[200px] md:h-[300px] object-contain mx-auto"
            />

            <div className="flex-1 space-y-4">
              <h1 className="text-xl md:text-3xl font-semibold md:font-bold text-[var(--primary)]">
                {item?.name}
              </h1>
              <p className="text-gray-600">{item?.description}</p>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-[var(--btn-black)]">
                  {formatPrice(Number(item?.discountPrice))}
                </span>
                <span className="text-red-500 line-through">
                  {formatPrice(Number(item?.price))}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                <span>Category:</span>{" "}
                <span className="font-medium">{item?.category}</span>
              </div>

              <div className="text-sm text-gray-500">
                <span>Stock:</span>{" "}
                <span
                  className={`font-medium ${
                    Number(item?.stock) > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {Number(item?.stock) > 0
                    ? `${item?.stock} available`
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex items-center gap-5">
                <button
                  className="bg-[var(--btn-black)] text-white px-6 py-3 rounded-lg hover:opacity-80 cursor-pointer transition-all ease-in-out duration-300"
                  onClick={() => {
                    addItem(item), setIsCartOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
        <Cart />
        {loading && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-20">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="border border-[var(--line)] rounded-xl overflow-hidden bg-white animate-pulse flex flex-col justify-between items-center"
              >
                <div className="h-96 bg-[var(--grey)] w-full"></div>
                <div className="p-4 w-full space-y-4">
                  <div className="h-6 bg-[var(--grey)] w-3/4 rounded"></div>
                  <div className="h-4 bg-[var(--grey)] w-full rounded"></div>
                  <div className="h-4 bg-[var(--grey)] w-full rounded"></div>
                  <div className="h-4 bg-[var(--grey)] w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && itemSameCate.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-20">
            {itemSameCate.map((item: any) => (
              <div key={item.id} className="relative">
                <Link
                  href={`/shop/${item.id}`}
                  className="border border-[var(--line)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white flex flex-col justify-between items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-56 md:h-96 object-contain p-5"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/fallback.jpg";
                    }}
                  />

                  <div className="p-4 bg-[var(--grey)]">
                    <h2 className="text-lg font-semibold text-[var(--primary)] mb-2">
                      {item.name}
                    </h2>
                    <p className="text-sm text-[var(--secondary)] mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl font-bold text-[var(--btn-black)]">
                        {formatPrice(Number(item.discountPrice))}
                      </span>
                      <span className="text-sm line-through text-red-500">
                        {formatPrice(Number(item.price))}
                      </span>
                    </div>

                    <span
                      className={
                        Number(item.stock) > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {Number(item.stock) > 0
                        ? `In Stock: ${item.stock}`
                        : "Out of Stock"}
                    </span>
                  </div>
                </Link>
                <button
                  className="bg-[var(--btn-black)] cursor-pointer text-white px-3 py-2 rounded-md hover:opacity-80 transition-all duration-200 absolute bottom-3 right-3"
                  onClick={() => {
                    addItem(item), setIsCartOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center text-gray-500 py-20">
              No products found.
            </div>
          )
        )}
      </div>
    </>
  );
}
