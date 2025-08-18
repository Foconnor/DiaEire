"use client";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";
import PreFooter from "@/components/pre-footer";
import Footer from "@/components/footer";

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
    <>
      <div className="flex flex-col items-center justify-start w-[100vw_-_16px] md:h-screen pt-5 mx-4">
        <Link href="/">
          {logo ? (
            <img
              className="md:w-fit md:h-fit w-[160px]"
              src={logo}
              alt="logo"
              width={350}
              height={350}
            />
          ) : (
            <div className="animate-pulse h-[100px] md:h-[85px] leading-[100px] md:leading-[85px]">
              Loading...
            </div>
          )}
        </Link>
        <h2 className="mt-5 font-bold md:text-5xl text-3xl leading-[48px] text-center">
          Get the latest from Labour
        </h2>
        <div className="mt-5 flex gap-10 md:flex-row flex-col items-center md:items-start">
          <div className="w-full md:w-fit">
            <img
              className="rounded-md mb-6 w-full md:w-[500px]"
              src="https://assets.movement.industries/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1FUIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7a1a6b8fc97e529910a13e7b66d0a79ab7ccf8f4/image.png?client_id=34"
              alt=""
              width={500}
              height={500}
            />
            <p className="mb-6">
              The work of change has begun and you can be part of it.
            </p>
            <p>
              Let's stay in touch. Sign up for regular updates, including the{" "}
              <br />
              Labour Rosette newsletter, today.
            </p>
          </div>
          <div className="p-8 md:w-[340px] w-full rounded-md shadow-[4px_16px_48px_0px_#19193629]">
            <form action="">
              <label
                htmlFor="name"
                className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm"
              >
                Name *
              </label>
              <input
                className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
                type="text"
                placeholder="Name"
                id="name"
              />
              <label
                htmlFor="email"
                className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm mt-4 block"
              >
                Email address *
              </label>
              <input
                className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
                type="email"
                placeholder="Email address"
                id="email"
              />
              <label
                htmlFor="phone"
                className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm mt-4 block"
              >
                Phone number
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                id="phone"
                className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
              />
              <label
                htmlFor="postcode"
                className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm mt-4 block"
              >
                Postcode *
              </label>
              <input
                type="number"
                placeholder="Postcode"
                id="postcode"
                className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full block"
              />
              <div className="mt-4 mb-3">
                <p className="font-semibold text-[var(--grey-300)] text-sm">
                  Join our email and SMS lists? *
                </p>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="emailLists" id="yes" />
                <label htmlFor="yes" className="text-[15px]">
                  Yes
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                <input type="radio" name="emailLists" id="no" />
                <label htmlFor="no" className="text-[15px]">
                  No
                </label>
              </div>
              <button className="bg-[var(--primary)] py-2 w-full text-[var(--background)] font-semibold rounded-sm mt-6 text-sm">
                Submit
              </button>
              <p className="mt-2 text-[9px] text-center">
                You can manage your preferences or unsubscribe at any time. If
                you would like to know more about how we use your information
                click here. When 'no' is selected, your data will be processed
                with the express purpose of delivering the content you have
                signed up for, for example, but not limited to: a manifesto, or
                an event invitation - you will receive no further marketing
                communications from the Labour Party.
              </p>
            </form>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </>
  );
}

export default page;
