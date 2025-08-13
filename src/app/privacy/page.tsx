import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import Privacy from "@/components/privacy";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <Privacy />
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
