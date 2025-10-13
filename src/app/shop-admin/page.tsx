"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Navbar from "@/components/navbar";
import Header from "../../components/shop-admin/header";
import Products from "@/components/shop-admin/products";
import Orders from "@/components/shop-admin/orders";
import Footer from "@/components/footer";
import PreFooter from "@/components/pre-footer";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSelected, setSelected] = useState(0);

  const handleValueChange = (newValue: number) => {
    setSelected(newValue);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/shop-admin/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading)
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        <h1 className="text-center text-4xl animate-pulse">Loading...</h1>
      </div>
    );

  return (
    <div>
      <Navbar buttons={false} />
      <Header handleValueChange={handleValueChange} value={isSelected} />
      {!isSelected ? <Products /> : <Orders />}
      <PreFooter />
      <Footer />
    </div>
  );
}
