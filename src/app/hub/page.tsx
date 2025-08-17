import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Navbar buttons={false} />
      <div className="wrapper grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="flex flex-col p-4 lg:p-16 my-6 lg:my-0">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold">
            Manage your member profile with <br />
            <span className="text-[var(--primary)]">Labour Hub.</span>
          </h2>
          <p className="my-6 lg:my-10">
            Through Labour Hub, you can access all of our digital tools to
            participate in campaigns, and update your personal Labour profile.
          </p>
          <Link href="/hub/login" className="w-full px-4 py-2 bg-[var(--primary)] text-[var(--background)] rounded-full mb-4 text-center hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-200">
            Login
          </Link>
          <button className="w-full px-4 py-2 bg-[var(--grey-200)] text-[var(--foreground)] rounded-full hover:bg-[var(--grey-300)] transition-all ease-in-out duration-200 cursor-pointer">Labour Hub User Guide</button>
        </div>
        <div className="w-full justify-center items-center hidden md:flex">
          <img
            className="w-full h-full"
            src={"https://hub.labour.org.uk/build/assets/splash-BRbraNTp.png"}
            alt="image"
          />
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
