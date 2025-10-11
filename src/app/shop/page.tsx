import Shop from "@/components/shop";
import Navbar from "@/components/navbar";
import React from "react";
import Footer from "@/components/footer";
import PreFooter from "@/components/pre-footer";

function page() {
  return (
    <div>
      <Navbar />
      <Shop/>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
