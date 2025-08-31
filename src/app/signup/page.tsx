"use client";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";
import PreFooter from "@/components/pre-footer";
import Footer from "@/components/footer";
import countries from "world-countries";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

function Page() {
  const Router = useRouter();
  const [logo, setLogo] = useState<string>("");
  const [title, setTitle] = useState<string>("Loading...");
  const [img, setImg] = useState<string>("Loading...");
  const [paraOne, setParaOne] = useState<string>("Loading...");
  const [paraTwo, setParaTwo] = useState<string>("Loading...");
  const [formDes, setFormDes] = useState<string>("Loading...");

  // 🔹 Form fields
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Ireland");
  const [emailLists, setEmailLists] = useState("no");
  const [loading, setLoading] = useState(false); // loader state

  // Fetch Navbar
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

  // Fetch Signup Page Data
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fname || !lname || !email || !country || !emailLists) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true); // start loader
    try {
      await addDoc(collection(db, "Users"), {
        firstName: fname,
        lastName: lname,
        email,
        country,
        emailLists,
        createdAt: new Date(),
      });

      toast.success("Signup successful!");
      setFname("");
      setLname("");
      setEmail("");
      setCountry("");
      setEmailLists("");

      Router.push("/");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <>
      <Navbar buttons={false} />
      <div className="flex flex-col items-center justify-start pt-5 mx-4">
        <h2 className="text-[calc(1.305rem_+_.55vw)] mt-5 text-left md:min-w-[885px] min-w-[calc(100vw_-_44px)]">
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
              <div className="md:w-[500px] md:h-[281px] w-[calc(100vw_-_40px)] h-[400px] bg-[var(--grey-300)] animate-pulse mb-6 rounded-md" />
            )}
            <p className="mb-6 max-w-[500px]">{paraOne}</p>
            <p className="md:max-w-[500px]">{paraTwo}</p>
          </div>
          <div className="p-8 md:w-[340px] w-full rounded-md shadow-[4px_16px_48px_0px_#19193629]">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div>
                  <label
                    htmlFor="fname"
                    className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm"
                  >
                    First Name *
                  </label>
                  <input
                    className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
                    type="text"
                    placeholder="First Name"
                    id="fname"
                    required
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="mb-1.5 font-semibold text-[var(--grey-300)] text-sm"
                  >
                    Last Name *
                  </label>
                  <input
                    className="py-1 px-1.5 border border-[var(--line)] rounded-sm w-full"
                    type="text"
                    placeholder="Last Name"
                    id="lname"
                    required
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
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
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Choose country</option>
                {formattedCountries.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>

              <div className="mt-4 mb-3">
                <p className="font-semibold text-[var(--grey-300)] text-sm">
                  Join our email and SMS lists? *
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="emailLists"
                  id="yes"
                  value="yes"
                  checked={emailLists === "yes"}
                  onChange={(e) => setEmailLists(e.target.value)}
                />
                <label htmlFor="yes" className="text-[15px]">
                  Yes
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                <input
                  type="radio"
                  name="emailLists"
                  id="no"
                  value="no"
                  checked={emailLists === "no"}
                  onChange={(e) => setEmailLists(e.target.value)}
                />
                <label htmlFor="no" className="text-[15px]">
                  No
                </label>
              </div>

              {/* 🔹 Submit button with loader */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-[var(--primary)] py-2 w-full cursor-pointer text-[var(--background)] font-semibold rounded-sm mt-6 text-sm flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Submit"
                )}
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

export default Page;
