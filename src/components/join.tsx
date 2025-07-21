"use client";
import React, { useState } from "react";
import Button from "./common/button";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Join() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "members"), {
        email: email.trim(),
        isExistingMember: isChecked,
        createdAt: new Date().toISOString(),
      });
      toast.success("Thank you for joining! We've received your submission.");
      setEmail("");
      setIsChecked(false);
    } catch (e) {
      toast.error(
        "There was an error submitting your request. Please try again later."
      );
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-[var(--grey)] my-5 rounded-lg">
      <div className="join-bg relative">
        <h2 className="p-5 text-[var(--background)] absolute bottom-0 left-0 z-10 text-[32px] leading-tight font-bold">
          Join <br /> the Dia le hÉireann
        </h2>
      </div>
      <div className="px-5 mt-6">
        <p className="font-bold text-lg">Change has begun, be part of it.</p>
        <p className="mt-5 mb-10 text-[var(--grey-300)]">
          Join hundreds of thousands of party members as we fix the foundations
          and rebuild Ireland. Email address
        </p>
        <div className="p-4 pb-10">
          <form onSubmit={handleSubmit} noValidate>
            <input
              className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
              type="email"
              placeholder="Enter your email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              aria-invalid={false}
              disabled={loading}
            />
            <div className="mt-5 flex items-center gap-2">
              <input
                checked={isChecked}
                type="checkbox"
                name="checkbox"
                id="checkbox"
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                disabled={loading}
              />
              <label
                htmlFor="checkbox"
                className="text-[var(--grey-300)] cursor-pointer"
              >
                Are you an existing First Ireland member?
              </label>
            </div>
            <button
              type="submit"
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Get started"}
            </button>
          </form>
          <p className="mt-6 text-sm text-[var(--grey-300)]">
            Read more about how we use your data in our{" "}
            <Link href="" className="underline">
              Privacy Notice.
            </Link>{" "}
            You can unsubscribe at any time.
          </p>
          <p className="mt-6 text-sm text-[var(--grey-300)]">
            Payments securely processed by GoCardless. GoCardless Ltd (company
            registration number 07495895) is authorised by the Financial Conduct
            Authority under the Payment Services Regulations 2017, registration
            number 597190, for the provision of payment services. GoCardless
            uses personal data as described in their{" "}
            <Link href="" className="underline">
              Privacy Notice.
            </Link>
          </p>
          <Link
            href="/what-is-membership"
            className="mt-8 px-4 py-5 flex flex-col justify-between gap-y-5 bg-[var(--background)] rounded-lg border-[1px] border-[var(--line)]"
          >
            <p className="font-bold text-lg">
              What is Dia le hÉireann membership?
            </p>
            <Button
              content="Learn more"
              className="!bg-[var(--backgorund)] !text-[var(--primary)] !p-0"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
