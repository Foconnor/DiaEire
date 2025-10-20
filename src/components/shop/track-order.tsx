"use client";
import { Order, Product } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { statusColors } from "@/lib/statusColors";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import { formatPrice } from "@/lib/formatPrice";

function TrackOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const { orders } = useFetchOrders();
  const { products } = useFetchProducts();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFoundOrders([]);
      return;
    }

    if (orders && Array.isArray(orders)) {
      setLoading(true);

      const timer = setTimeout(() => {
        const query = searchQuery.trim().toLowerCase();

        const matchedOrders = orders.filter(
          (order) =>
            order.id.toLowerCase() === query ||
            order.email.toLowerCase() === query
        );

        setFoundOrders(matchedOrders);
        setLoading(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, orders]);

  // helper to get product details
  const getProductDetails = (ids: string[]) => {
    return products.filter((p: Product) => ids.includes(p.id));
  };

  return (
    <div>
      {/* Header */}
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1rem_+_1.9vw)] md:text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-full">
            <Link href="/shop" className="underline">
              Shop
            </Link>{" "}
            \ Track Your Order
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter Your Order ID or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-[var(--primary)] w-full py-4 px-3 mt-10 outline-0"
        />
      </div>

      {/* Results */}
      <div className="wrapper">
        {searchQuery === "" ? (
          <div className="h-80 w-full flex items-center justify-center">
            <p className="text-[var(--grey-300)] text-center">
              Want to know where your order is? Just enter your Order ID or
              Email to track it instantly.
            </p>
          </div>
        ) : loading ? (
          // 🔄 Skeleton Loader
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-4 mt-10 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="grid md:grid-cols-2 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
              ))}
            </div>
          </div>
        ) : foundOrders.length > 0 ? (
          // ✅ Multiple orders
          <div className="space-y-10 mt-10">
            {foundOrders.map((order, idx) => {
              const orderProducts = getProductDetails(order.productsIds);

              return (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-4"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Order #{idx + 1} — {order.id}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <p>
                      <strong>Name:</strong> {order.firstName} {order.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.streetAddress},{" "}
                      {order.townCity}
                    </p>
                    <p>
                      <strong>Postcode:</strong> {order.postcode}
                    </p>
                    <p>
                      <strong>Country:</strong> {order.country}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>
                      <span className="ml-2 bg-green-400 rounded-full px-3 py-1 text-white font-medium capitalize">
                        {order.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Order Status:</strong>
                      <span
                        className={`ml-2 font-medium text-white px-3 py-1 rounded-full capitalize ${
                          statusColors[order.status]
                        }`}
                      >
                        {order.status.replaceAll("_", " ")}
                      </span>
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* 🛍 Product List */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold">Products</h3>
                    <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {orderProducts.length > 0 ? (
                        orderProducts.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-4 border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {p.name}
                              </p>
                              <p className="text-[var(--primary)] font-semibold">
                                {formatPrice(Number(p.discountPrice))}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">
                          No product details found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // ❌ Not found
          <div className="h-80 w-full flex items-center justify-center">
            <p className="text-[var(--grey-300)]">
              No order found with this ID or Email. Please check and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
