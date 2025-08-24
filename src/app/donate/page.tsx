"use client";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function DonatePage() {
  const [logo, setLogo] = useState<string>("");
  const [donationValue, setDonationValue] = useState(5);
  const [customDonation, setCustomDonation] = useState<string>("5");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("Loading...");
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
        toast.error("Error fetching logo");
        console.error("Error fetching logo:", error);
      }
    };
    getSectionData();
  }, []);

  // Validate and set custom donation
  const handleCustomDonationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCustomDonation(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setDonationValue(num);
    }
  };

  // Step navigation
  const handleContinue = () => setStep((prev) => prev + 1);
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
  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:gap-20">
      <div className="mt-5">
        <div className="flex items-center justify-between">
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
              <div className="animate-pulse h-[85px] leading-[100px]">
                Loading...
              </div>
            )}
          </Link>
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
        <h2 className="font-bold md:text-4xl text-2xl font-ibm mt-8">
          {title}
        </h2>
        {logo ? (
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
      <div className="flex flex-col w-full md:min-h-screen min-h-[60vh] sm:px-30 md:px-10 lg:px-30 justify-center md:border-l border-[var(--line)] font-ibm">
        {step === 1 && (
          <>
            <p className="text-[22px] font-semibold mb-6 flex items-center">
              {/* SVG icon */}
              <svg
                fill="none"
                height="28"
                viewBox="0 0 28 28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--primary)] me-2"
                aria-hidden="true"
              >
                <g fill="currentColor">
                  <path
                    clipRule="evenodd"
                    d="m15.0393 2.44995c-.6707-.24772-1.4079-.24772-2.0786 0l-8.30715 3.06797c-.39274.14504-.65355.51939-.65355.93807v7.54411c0 3.6861 1.95965 6.6874 4.28911 8.8073 1.16017 1.0557 2.38789 1.8689 3.45309 2.4137 1.1081.5668 1.9145.779 2.2578.779s1.1497-.2122 2.2578-.779c1.0652-.5448 2.2929-1.358 3.4531-2.4137 2.3294-2.1199 4.2891-5.1212 4.2891-8.8073v-7.54411c0-.41868-.2608-.79303-.6536-.93807zm-2.7715-1.876139c1.1179-.412868 2.3465-.412868 3.4644 0l8.3071 3.067969c1.1783.43514 1.9607 1.55819 1.9607 2.81421v7.54411c0 4.4389-2.3618 7.9375-4.943 10.2865-1.2952 1.1786-2.6702 2.092-3.8885 2.7151-1.1754.6012-2.3332.9984-3.1685.9984s-1.9931-.3972-3.1685-.9984c-1.21831-.6231-2.59328-1.5365-3.88847-2.7151-2.58125-2.349-4.94303-5.8476-4.94303-10.2865v-7.54411c0-1.25602.78243-2.37907 1.96066-2.81421z"
                    fillRule="evenodd"
                  ></path>
                  <path d="m18.2906 11.75h-.2535v-1.1855c0-2.19278-1.7415-4.02451-3.9182-4.06361-.0595-.00107-.1783-.00107-.2378 0-2.1767.0391-3.91819 1.87083-3.91819 4.06361v1.1855h-.25354c-.39069 0-.70937.4028-.70937.9003v5.9463c0 .4969.31868.9035.7094.9035h8.5812c.3907 0 .7094-.4066.7094-.9035v-5.9463c0-.4974-.3187-.9003-.7094-.9003zm-3.4867 3.8674v1.7967c0 .2058-.1723.3799-.3784.3799h-.8509c-.2061 0-.3785-.1741-.3785-.3799v-1.7967c-.1999-.1966-.3162-.4684-.3162-.7691 0-.5698.4408-1.0594 1.0013-1.082.0594-.0024.1783-.0024.2377 0 .5605.0226 1.0013.5122 1.0013 1.082 0 .3007-.1164.5725-.3163.7691zm1.5623-3.8674h-4.7323v-1.1855c0-1.30621 1.0623-2.38623 2.3661-2.38623s2.3662 1.08002 2.3662 2.38623z"></path>
                </g>
              </svg>
              {donationTitle}
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="py-2 flex items-center justify-center rounded-[10px] border-[var(--primary)] border-2">
                {donationType}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              {donationAmounts.length > 0
                ? donationAmounts.map((item, i) => (
                    <div
                      key={i}
                      className={`py-2 flex items-center justify-center rounded-[10px] cursor-pointer ${
                        donationValue === item
                          ? "border-2 border-[var(--primary)]"
                          : "border border-[var(--line)]"
                      }`}
                      onClick={() => {
                        setDonationValue(item);
                        setCustomDonation(item);
                      }}
                    >
                      €{item}
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="py-5 w-[121px] bg-[var(--grey-200)] animate-pulse rounded-[10px]"
                    />
                  ))}
            </div>
            <form onSubmit={handleContinue} className="w-full">
              <div className="relative mt-4">
                <span className="absolute left-5 top-[17px]">€</span>
                <input
                  type="number"
                  min={1}
                  className="w-full border border-[var(--line)] py-3 ps-[35px] pe-1 rounded-[10px] text-2xl text-[var(--primary)]"
                  value={customDonation}
                  required
                  onChange={handleCustomDonationChange}
                  aria-label="Custom donation amount"
                />
              </div>
              <button
                className="mt-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-xl cursor-pointer hover:bg-[var(--btn-hover-bg)] transition-all duration-200 ease-in-out w-full"
                disabled={loading || donationValue < 1}
                aria-busy={loading}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <div>
            <button
              className="opacity-70 text-sm flex items-center gap-1 mb-2"
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
            <p className="mt-3 mb-6 text-[21px] font-semibold">
              Enter your details
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleContinue();
              }}
            >
              <input
                type="text"
                placeholder="First Name"
                className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                required
              />
              <input
                type="email"
                placeholder="Email address"
                className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
                required
              />
              <input
                type="text"
                placeholder="Phone number (optional)"
                className="py-3 px-3 border border-[var(--line)] rounded-[10px]"
              />

              <button
                type="submit"
                className="mt-6 py-3 bg-[var(--primary)] text-[var(--background)] rounded-xl cursor-pointer hover:bg-[var(--btn-hover-bg)] transition-all duration-200 ease-in-out"
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {step === 3 && (
          <div>
            <button
              className="opacity-70 text-sm flex items-center gap-1 mb-2"
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
            <p className="mt-3 mb-6 text-[21px] font-semibold">
              You donate €{donationValue}
            </p>

            <Link
              href={`https://paypal.com/paypalme/Dialeheireann/${donationValue}`}
              target="_blank"
              rel="noopener noreferrer"
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
  );
}

export default DonatePage;
