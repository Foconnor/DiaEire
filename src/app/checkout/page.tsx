"use client";
import Checkout from "@/components/checkout/checkout";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

function page() {
  if (!publishableKey) {
    return (
      <div>
        <Navbar />
        <div className="p-4 text-red-600">
          Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY — add it to your .env and
          restart the dev server.
        </div>
        <PreFooter />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Elements stripe={publishableKey ? loadStripe(publishableKey) : null}>
        <Checkout />
      </Elements>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
