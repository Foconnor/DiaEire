"use client";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect } from "react";
import { db } from "../../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function page() {
  const [logo, setLogo] = React.useState<string>("");
  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "navbar", "XHYyMaLOYnYvwDxUQURn");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogo(data.logo || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching navbar data");
        console.error("Error fetching navbar data:", error);
      }
    };
    getSectionData();
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[var(--grey-200)]">
      <div className="bg-[var(--background)] min-h-[560px] w-[430px] rounded-2xl border border-[var(--line)] flex flex-col justify-center items-center p-10">
        <Link href="/">
          {logo ? (
            <img
              className="w-[200px]"
              src={logo}
              alt="logo"
              width={350}
              height={350}
            />
          ) : (
            <div className="animate-pulse h-[44px] leading-[44px] text-center">
              Loading...
            </div>
          )}
        </Link>
        <h3 className="mb-5 mt-2.5 text-2xl font-semibold">Welcome</h3>
        <p className="text-center">
          Log in using your Labour Account. If you have not logged on to any
          Labour services before, or you have recently changed your email
          address, click Sign up.
        </p>
        <form action="">
          <input
            type="email"
            placeholder="Email address*"
            className="h-[50px] px-4 mb-4 bg-[var(--grey-200)] w-full border border-[var(--line)] rounded-lg mt-5 focus:outline-[var(--primary)] focus:outline-1"
          />
          <input
            type="email"
            placeholder="Password*"
            className="h-[50px] px-4 bg-[var(--grey-200)] w-full border border-[var(--line)] rounded-lg focus:outline-[var(--primary)] focus:outline-1"
          />
          <Link
            href="/forgot-password"
            className="underline text-[var(--primary)] mt-3 block text-sm"
          >
            Forgot password?
          </Link>
          <button className="w-full px-4 py-3 bg-[var(--primary)] text-[var(--background)] rounded-full hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-200 cursor-pointer mt-8">
            Continue
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link
            href="/hub/signup"
            className="underline text-[var(--primary)] text-sm"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
