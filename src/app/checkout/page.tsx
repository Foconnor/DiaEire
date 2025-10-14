import Checkout from "@/components/checkout/checkout";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <Checkout />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
