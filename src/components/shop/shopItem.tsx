"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


interface ShopItemType {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

  const shopItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 79.99,
      discountPrice: 59.99,
      stock: 24,
      rating: 4.5,
      reviews: 128,
      image: "https://modernwears.pk/wp-content/uploads/2023/09/16.jpg",
      description:
        "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    },
    {
      id: 2,
      name: "Smart Watch Pro X",
      category: "Electronics",
      price: 149.99,
      discountPrice: 129.99,
      stock: 15,
      rating: 4.2,
      reviews: 89,
      image:
        "https://images.priceoye.pk/hw-x-pro-series-10-smart-watch-pakistan-priceoye-c9we2-500x500.webp",
      description:
        "Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.",
    },
    {
      id: 3,
      name: "Men’s Casual Denim Jacket",
      category: "Fashion",
      price: 49.99,
      discountPrice: 39.99,
      stock: 42,
      rating: 4.7,
      reviews: 203,
      image:
        "https://nstore.com.pk/cdn/shop/files/IMG-20241102-WA0029.jpg?v=1730544223",
      description:
        "Stylish denim jacket perfect for casual wear and outdoor adventures.",
    },
    {
      id: 4,
      name: "Women’s Running Shoes",
      category: "Footwear",
      price: 69.99,
      discountPrice: 54.99,
      stock: 30,
      rating: 4.4,
      reviews: 175,
      image: "https://cdn.adsport.cz/zbozi/asics/1200x630/asics-gel-nimbus-25-w_1012B356-701_SB-FR.jpg",
      description:
        "Lightweight running shoes with breathable mesh and flexible soles.",
    },
    {
      id: 5,
      name: "Gaming Keyboard RGB",
      category: "Electronics",
      price: 89.99,
      discountPrice: 69.99,
      stock: 18,
      rating: 4.8,
      reviews: 97,
      image: "https://static3.webx.pk/files/821/Images/k551-rgb-1-1-821-0-260722125220404.jpg",
      description:
        "Mechanical RGB keyboard with anti-ghosting keys and customizable lighting.",
    },
    {
      id: 6,
      name: "Cotton Crew Neck T-Shirt",
      category: "Fashion",
      price: 19.99,
      discountPrice: 14.99,
      stock: 75,
      rating: 4.3,
      reviews: 312,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1qNkPqq1x4W2R_PRm5BatfYA7PjrQ0nisg&s",
      description:
        "Soft and comfortable 100% cotton T-shirt, available in multiple colors.",
    },
    {
      id: 7,
      name: "Wooden Study Table",
      category: "Furniture",
      price: 159.99,
      discountPrice: 139.99,
      stock: 9,
      rating: 4.6,
      reviews: 45,
      image: "https://trendwoodpk.com/cdn/shop/files/FB_IMG_1595144205208.jpg?v=1741602069&width=500",
      description:
        "Elegant wooden study table with storage drawers and a smooth finish.",
    },
    {
      id: 8,
      name: "LED Desk Lamp",
      category: "Home & Living",
      price: 29.99,
      discountPrice: 24.99,
      stock: 33,
      rating: 4.5,
      reviews: 84,
      image: "https://www.flashsale.pk/image/cache/data/products/100941/blitzwolf-bw-lt1-eye-protection-smart-dimmable-led-desk-lamp-with-2-1a-usb-charging-port-100941-1-800x800.webp",
      description:
        "Adjustable LED desk lamp with touch control and 3 brightness levels.",
    },
    {
      id: 9,
      name: "Men’s Leather Wallet",
      category: "Accessories",
      price: 34.99,
      discountPrice: 29.99,
      stock: 64,
      rating: 4.1,
      reviews: 58,
      image: "https://www.waldorleather.com/cdn/shop/files/DSC01067-Enhanced-NR_2.jpg?v=1734092186",
      description:
        "Premium leather wallet with multiple card slots and a sleek design.",
    },
    {
      id: 10,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 24.99,
      discountPrice: 19.99,
      stock: 48,
      rating: 4.4,
      reviews: 122,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREB6t0E6tGM740gk43HFcCwqzaFz2BHsLXsQ&s",
      description:
        "Ergonomic wireless mouse with silent clicks and long-lasting battery.",
    },
    {
      id: 11,
      name: "Ceramic Coffee Mug",
      category: "Home & Kitchen",
      price: 12.99,
      discountPrice: 9.99,
      stock: 120,
      rating: 4.9,
      reviews: 441,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQboJTse7Ky0rAlMuwait650Wj7efLo-h-PEw&s",
      description:
        "Durable ceramic mug, perfect for coffee, tea, or hot chocolate.",
    },
    {
      id: 12,
      name: "Backpack 30L",
      category: "Bags",
      price: 59.99,
      discountPrice: 44.99,
      stock: 37,
      rating: 4.6,
      reviews: 191,
      image: "https://drytidegear.com/wp-content/uploads/30L-waterproof-backpack-back-side.jpg",
      description:
        "Water-resistant 30L backpack ideal for travel, work, or school.",
    },
  ];

export default function ShopItem() {
  const pathname = usePathname();
  const itemId = Number(pathname.split("/").pop());
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
            <Link href="/shop" className="underline">Shop</Link>{" "}\{" "}
            {item.name}
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
                {formatPrice(item.discountPrice)}
              </span>
              <span className="text-red-500 line-through">
                {formatPrice(item.price)}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              ⭐ {item.rating} ({item.reviews} reviews)
            </div>

            <div className="text-sm text-gray-500">
              <span>Category:</span>{" "}
              <span className="font-medium">{item.category}</span>
            </div>

            <div className="text-sm text-gray-500">
              <span>Stock:</span>{" "}
              <span
                className={`font-medium ${
                  item.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
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
