import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import ShopItem from "@/components/shop/shopItem";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <ShopItem />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
