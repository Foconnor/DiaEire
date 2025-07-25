import Footer from "@/components/footer";
import Join from "@/components/join";
import Navbar from "@/components/navbar";
import React from "react";

function Page() {
  return (
    <div>
      <Navbar buttons={false} />
      <Join />
      <div className="border-t-[1px] border-[var(--line)] pt-5 md:pt-0">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
