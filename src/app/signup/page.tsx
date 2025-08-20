"use client";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";
import PreFooter from "@/components/pre-footer";
import Footer from "@/components/footer";
import countries from "world-countries";

function page() {
  const [logo, setLogo] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("Loading...");
  const [img, setImg] = React.useState<string>("Loading...");
  const [paraOne, setParaOne] = React.useState<string>("Loading...");
  const [paraTwo, setParaTwo] = React.useState<string>("Loading...");
  const [formDes, setFormDes] = React.useState<string>("Loading...");
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

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "signup", "signupPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading...");
          setImg(data.img || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
          setFormDes(data.formDes || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching signup page data");
        console.error("Error fetching signup page data:", error);
      }
    };
    getSectionData();
  }, []);

  const formattedCountries = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
  }));

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
            <div className="animate-pulse h-[35px] md:h-[85px] leading-[35px] md:leading-[85px]">
              Loading...
            </div>
          )}
        </Link>
        <h2 className="mt-5 font-bold md:text-5xl text-3xl leading-[48px] text-center">
          {title}
        </h2>
        <div className="mt-5 flex gap-10 md:flex-row flex-col items-center md:items-start">
          <div className="w-full md:w-fit">
            {img !== "Loading..." ? (
              <img
                className="rounded-md mb-6 w-full md:w-[500px]"
                src={img}
                alt="signup page image"
                width={500}
                height={500}
              />
            ) : (
              <div className="md:w-[500px] md:h-[333px] w-[calc(100vw_-_40px)] h-[400px] bg-[var(--grey-300)] animate-pulse mb-6 rounded-md" />
            )}
            <p className="mb-6">{paraOne}</p>
            <p className="md:max-w-[500px]">{paraTwo}</p>
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
                htmlFor="country"
                className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm mt-4 block"
              >
                Outside Ireland?
              </label>
              <select
                id="country"
                name="country"
                className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
                required
                defaultValue={"select"}
              >
                {formattedCountries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
                <option value="select">Choose country</option>
              </select>
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
              <p className="mt-2 text-[9px] text-center">{formDes}</p>
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
