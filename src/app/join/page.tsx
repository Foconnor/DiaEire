import Join from "@/components/join";
import Navbar from "@/components/navbar";
import React from "react";

function Page() {
  return (
    <div>
      <Navbar buttons={false} />
      <Join />
    </div>
  );
}

export default Page;
