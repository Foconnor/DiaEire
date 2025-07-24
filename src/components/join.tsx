"use client";
import React, { useEffect, useState } from "react";
import Button from "./common/button";
import Link from "next/link";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Join() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [subTitle, setSubTitle] = useState("Loading...");
  const [subTitlePara, setSubTitlePara] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [Question, setQuestion] = useState("Loading...");
  const [linkText, setLinkText] = useState("Loading...");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "joinPage", "joinPageContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setSubTitle(data.subTitle || "");
          setSubTitlePara(data.subTitlePara || "");
          setParaOne(data.paraOne || "");
          setParaTwo(data.paraTwo || "");
          setQuestion(data.Question || "");
          setLinkText(data.linkText || "");
          setImage(data.image || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching join page data");
        console.error("Error fetching join page data:", error);
      }
    };
    getSectionData();
  }, []);

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
      <div
        className="join-bg relative "
        style={{ backgroundImage: `url(${image})` }}
      >
        <h2 className="p-5 text-[var(--background)] absolute bottom-0 left-0 z-10 text-[32px] leading-tight font-bold">
          {title}
        </h2>
      </div>
      <div className="px-5 mt-6">
        <p className="font-bold text-lg">{subTitle}</p>
        <p className="mt-5 mb-10 text-[var(--grey-300)]">{subTitlePara}</p>
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
          <p className="mt-6 text-sm text-[var(--grey-300)]">{paraOne}</p>
          <p className="mt-6 text-sm text-[var(--grey-300)]">{paraTwo}</p>
          <Link
            href="/what-is-membership"
            className="mt-8 px-4 py-5 flex flex-col justify-between gap-y-5 bg-[var(--background)] rounded-lg border-[1px] border-[var(--line)]"
          >
            <p className="font-bold text-lg">{Question}</p>
            <Button
              content={linkText}
              className="!bg-[var(--backgorund)] !text-[var(--primary)] !p-0"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
