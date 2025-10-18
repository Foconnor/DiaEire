import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import TrackOrder from "@/components/shop/track-order";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <TrackOrder />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
