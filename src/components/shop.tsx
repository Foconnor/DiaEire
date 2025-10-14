"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Pagination from "./common/pagination";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import Cart from "./shop/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/store/cartStore";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";

const Shop = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    error,
    loading,
    totalCount,
    fetchProductsPage,
    categories,
  } = useFetchProducts();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchPage = async () => {
      await fetchProductsPage(currentPage, selectedCategory, searchQuery);
    };

    fetchPage();
  }, [currentPage, selectedCategory, searchQuery]);

  const addItem = useCart((state) => state.addItem);
  const toggleCart = useCart((state) => state.toggleCart);
  const setIsCartOpen = useCart((state) => state.openCart);

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
          onChange={handleSearch}
          className="w-full md:w-[400px] border-b border-[var(--line)] h-10 px-2 text-sm outline-none text-gray-700"
        />
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            className="px-4 py-2 bg-[var(--primary)] text-white flex items-center gap-2 transition-all duration-200 hover:bg-[var(--btn-hover-bg)] cursor-pointer"
            onClick={toggleCart}
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Cart</span>
          </button>

          <div className="relative w-full md:w-48">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-full flex items-center justify-between border cursor-pointer border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm hover:bg-gray-50"
            >
              <span className="text-gray-700">{selectedCategory}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer ${
                      selectedCategory === category
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
      </div>
      <div className="wrapper py-14">
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

        {!loading && products.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-20">
            {products.map((item) => (
              <div key={item.id} className="relative">
                <Link
                  href={`/shop/${item.id}`}
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
        {products.length > 0 && (
          <Pagination
            totalItems={totalCount}
            itemsPerPage={9}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      <Cart  />
    </div>
  );
};

export default Shop;
