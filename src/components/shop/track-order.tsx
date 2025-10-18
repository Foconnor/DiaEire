"use client";
import { Order } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { statusColors } from "@/lib/statusColors";

function TrackOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      setTimeout(() => {
        setOrder({
          country: "PK",
          createdAt: "2025-10-18T14:20:52.494Z",
          email: "learnfromshehbaz08@gmail.com",
          firstName: "Muhammad Shehbaz",
          lastName: "Khan",
          nameLowerCase: "muhammad shehbaz khan",
          orderNotes: "",
          paymentStatus: "paid",
          phone: "03183790054",
          postcode: "75180",
          productsIds: [
            "6JCwLEDsLBIuyZD1K0pX",
            "WNw8kHfhEbTcgyRS1wXB",
            "2MOQXJYJHp2l6aPRoMSs",
            "GkBowVJPPPbuT4CJBdas",
          ],
          status: "processing",
          streetAddress: "House No L-128 Sector 35/E Korangi Karachi",
          townCity: "Karachi",
        });
        setLoading(false);
      }, 5000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [searchQuery]);
  return (
    <div>
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-full">
            <Link href="/shop" className="underline">
              Shop
            </Link>{" "}
            \ Track Your Order
          </h1>
        </div>
      </div>
      <div className="wrapper">
        <input
          type="text"
          placeholder="Enter Your Order Id Or Your Email"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="border border-[var(--primary)] w-full py-4 px-3 mt-10 outline-0"
        />
      </div>
      <div className="wrapper">
        {searchQuery === "" ? (
          <div className="h-80 w-full flex items-center justify-center">
            <p className="text-[var(--grey-300)]">
              Want to know where your order is? Just enter your Order ID and
              Email to track it instantly.
            </p>
          </div>
        ) : loading ? (
          <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-4 mt-10 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>

            <div className="grid md:grid-cols-2 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>
              ))}
            </div>

            <div className="mt-6">
              <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
              <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <li key={i} className="h-4 bg-gray-200 rounded w-1/2"></li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          order && (
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-4 mt-10">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
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
                  <span className="ml-2 bg-green-400 rounded-full px-3 py-1 text-white 0 font-medium capitalize">
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>Order Status:</strong>
                  <span
                    className={`ml-2 font-medium text-white px-3 py-1 rounded-full capitalize ${statusColors[order.status]}`}
                  >
                    {order.status.replaceAll("_", " ")}
                  </span>
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Products</h3>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  {order.productsIds.map((id: string, i: number) => (
                    <li key={i}>{id}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
