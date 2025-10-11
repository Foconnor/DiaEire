"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Pagination from "./shop/pagination";

const Shop = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
      image:
        "https://cdn.adsport.cz/zbozi/asics/1200x630/asics-gel-nimbus-25-w_1012B356-701_SB-FR.jpg",
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
      image:
        "https://static3.webx.pk/files/821/Images/k551-rgb-1-1-821-0-260722125220404.jpg",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1qNkPqq1x4W2R_PRm5BatfYA7PjrQ0nisg&s",
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
      image:
        "https://trendwoodpk.com/cdn/shop/files/FB_IMG_1595144205208.jpg?v=1741602069&width=500",
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
      image:
        "https://www.flashsale.pk/image/cache/data/products/100941/blitzwolf-bw-lt1-eye-protection-smart-dimmable-led-desk-lamp-with-2-1a-usb-charging-port-100941-1-800x800.webp",
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
      image:
        "https://www.waldorleather.com/cdn/shop/files/DSC01067-Enhanced-NR_2.jpg?v=1734092186",
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREB6t0E6tGM740gk43HFcCwqzaFz2BHsLXsQ&s",
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
      image: "https://bakeware.pk/cdn/shop/products/BW1742-1.png?v=1624874435",
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
      image:
        "https://drytidegear.com/wp-content/uploads/30L-waterproof-backpack-back-side.jpg",
      description:
        "Water-resistant 30L backpack ideal for travel, work, or school.",
    },
  ];

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(shopItems.map((i) => i.category)))],
    [shopItems]
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result =
      selected === "All"
        ? shopItems
        : shopItems.filter((item) => item.category === selected);

    if (query) {
      result = result.filter((item) => item.name.toLowerCase().includes(query));
    }

    return result;
  }, [selected, searchQuery, shopItems]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  return (
    <div>
      <div className="md:h-[220px] h-[100px] flex items-center bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)]">
            Shop
          </h1>
        </div>
      </div>
      <div className="wrapper !mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[400px] border-b border-[var(--line)] h-10 px-2 text-sm outline-none text-gray-700"
        />
        <div className="relative w-full md:w-48">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border cursor-pointer border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm hover:bg-gray-50"
          >
            <span className="text-gray-700">{selected}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {open && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelected(category);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    selected === category
                      ? "bg-gray-100 text-[var(--primary)] font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="wrapper py-14">
        {filteredItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/shop/${item.id}`)}
                className="border border-[var(--line)] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white flex flex-col justify-between items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-96 object-contain p-5"
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
                      {formatPrice(item.discountPrice)}
                    </span>
                    <span className="text-sm line-through text-red-500">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span
                      className={
                        item.stock > 0 ? "text-green-600" : "text-red-500"
                      }
                    >
                      {item.stock > 0
                        ? `In Stock: ${item.stock}`
                        : "Out of Stock"}
                    </span>
                    <button className="bg-[var(--btn-black)] cursor-pointer text-white px-3 py-2 rounded-md hover:opacity-80 transition-all duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            No products found.
          </div>
        )}
        <Pagination
          totalItems={shopItems.length}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Shop;
