"use client";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";

function DonatePage() {
  const [donationValue, setDonationValue] = useState(5);
  const [customDonation, setCustomDonation] = useState<string>("5");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("");
  const [copyright, setCopyright] = useState("Loading...");
  const [donationTitle, setDonationTitle] = useState("Loading...");
  const [donationType, setDonationType] = useState("Loading...");
  const [popupQuestion, setPopupQuestion] = useState("Loading...");
  const [popupAnswer, setPopupAnswer] = useState("Loading...");

  const [donationAmounts, setDonationAmounts] = useState([]);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const securityDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowShareDropdown(false);
      }
    }
    if (showShareDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareDropdown]);

  // Close security dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        securityDropdownRef.current &&
        !securityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSecurityDropdown(false);
      }
    }
    if (showSecurityDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSecurityDropdown]);

  const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleCopySiteUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Page link copied!");
      setShowShareDropdown(false);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "donation", "donationPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading...");
          setImg(data.img || "Loading...");
          setCopyright(data.copyright);
          setDonationTitle(data.donationTitle || "Loading...");
          setDonationType(data.donationType || "Loading...");
          setDonationAmounts(data.donationAmounts || "Loading...");
          setPopupQuestion(data.popupQuestion || "Loading...");
          setPopupAnswer(data.popupAwnser || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching donation page data");
        console.error("Error fetching donaiton page data:", error);
      }
    };
    getSectionData();
  }, []);

  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorSaving, setDonorSaving] = useState(false);

  async function handleDonorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !donationValue ||
      !donorFirstName.trim() ||
      !donorLastName.trim() ||
      !donorEmail.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setDonorSaving(true);
    try {
      await addDoc(collection(db, "donors"), {
        amount: donationValue,
        firstName: donorFirstName.trim(),
        lastName: donorLastName.trim(),
        email: donorEmail.trim(),
        phone: donorPhone.trim(),
        createdAt: new Date().toISOString(),
      });
      setStep(2);
    } catch (error) {
      toast.error("Failed to save donor info. Please try again.");
      console.error("Donor save error:", error);
    } finally {
      setDonorSaving(false);
    }
  }

  return (
    <>
      <Navbar buttons={false} />
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:gap-20">
        <div className="mt-5">
          <div className="flex items-center justify-between mt-8">
            <h2 className="font-bold md:text-4xl text-2xl font-ibm">{title}</h2>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="text-[14px] h-10 w-[96px] flex justify-center items-center border border-[var(--line)] rounded-[8px] px-3 cursor-pointer hover:bg-[var(--grey-200)] transition-all duration-200 ease-in-out"
                onClick={() => setShowShareDropdown((prev) => !prev)}
              >
                {/* SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--grey-300)] shrink-0 me-2"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share
              </button>
              {showShareDropdown && (
                <div className="absolute left-0 mt-2 w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-1">
                  <button
                    type="button"
                    className="w-full text-sm text-left p-1 font-ibm hover:bg-gray-100 flex gap-2 cursor-pointer rounded-lg"
                    onClick={handleCopySiteUrl}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
          {img ? (
            <img
              className="mt-7 rounded-2xl"
              src={img}
              alt="donation page image"
            />
          ) : (
            <div className="animate-pulse w-full h-[351px] bg-[var(--grey-200)] rounded-2xl mt-8" />
          )}
          <p className="mt-7 font-ibm text-sm md:text-base">{copyright}</p>
          <div className="flex gap-3 mt-4">
            <Link
              href="/privacy"
              className="underline font-ibm text-sm md:text-base"
            >
              Privacy Policy
            </Link>
            <Link
              href="/privacy#cookies"
              className="underline font-ibm text-sm md:text-base"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full md:min-h-[calc(100vh_-_103px)] min-h-[60vh] sm:px-30 md:px-10 lg:px-30 justify-center md:border-l border-[var(--line)] font-ibm">
          {step === 1 && (
            <div>
              <p className="mt-3 mb-6 text-[21px] font-semibold">
                Enter your details
              </p>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleDonorSubmit}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                  value={donorFirstName}
                  onChange={(e) => setDonorFirstName(e.target.value)}
                  required
                  disabled={donorSaving}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                  value={donorLastName}
                  onChange={(e) => setDonorLastName(e.target.value)}
                  required
                  disabled={donorSaving}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                  disabled={donorSaving}
                />
                <input
                  type="text"
                  placeholder="Phone number (optional)"
                  className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  disabled={donorSaving}
                />

                <button
                  type="submit"
                  className="mt-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-xl cursor-pointer hover:bg-[var(--btn-hover-bg)] transition-all duration-200 ease-in-out"
                  disabled={donorSaving}
                >
                  {donorSaving ? "Saving..." : "Continue"}
                </button>
              </form>
            </div>
          )}
          {step === 2 && (
            <div>
              <button
                className="opacity-70 text-sm flex items-center gap-1 mb-2 cursor-pointer"
                onClick={handleBack}
                aria-label="Back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </button>
              <div className="min-h-[300px] flex flex-col justify-center px-4">
                <p className="mb-1">We use PayPal for secure transactions.</p>
                <p className="mb-8">Click the button to continue</p>
                <Link
                  href={
                    "https://www.paypal.com/donate/?hosted_button_id=QA36YEGQF83H4"
                  }
                  className="rounded-sm bg-[#ffc439] h-[45px] w-full flex items-center justify-center hover:brightness-95 transition-all duration-200 ease-in-out"
                >
                  <img
                    className=""
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM7IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM7IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBD IDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                    alt="paypal logo"
                    width={80}
                  />
                </Link>
              </div>
            </div>
          )}
          <div className="border-b border-[var(--line)] mt-12"></div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="relative" ref={securityDropdownRef}>
              <button
                className="underline text-sm opacity-80 flex-shrink-0 cursor-pointer"
                onClick={() => setShowSecurityDropdown((prev) => !prev)}
                type="button"
              >
                {popupQuestion}
              </button>
              {showSecurityDropdown && (
                <div className="absolute -left-[55px] bottom-7 w-[260px] bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3 text-sm font-ibm">
                  <p className="font-medium text-base">{popupQuestion}</p>
                  <div className="mt-1">{popupAnswer}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonatePage;
