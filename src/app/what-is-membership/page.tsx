import Footer from "@/components/footer";
import Membership from "@/components/membership";
import Navbar from "@/components/navbar";
import React from "react";

function Page() {
  return (
    <div>
      <Navbar buttons={false} />
      <Membership />
      <div className="border-t-[1px] border-[var(--line)] pt-5 md:pt-0">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
