"use client";
import React, { useEffect } from "react";
import Button from "./common/button";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Navbar({ buttons = true }: { buttons?: boolean }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [logo, setLogo] = React.useState<string>("");
  const [leftSideButton, setLeftSideButton] =
    React.useState<string>("Loading...");
  const [rightSideButton, setRightSideButton] =
    React.useState<string>("Loading...");
  const [bottomLeftLink, setBottomLeftLink] =
    React.useState<string>("Loading...");
  const [bottomRightLink, setBottomRightLink] =
    React.useState<string>("Loading...");

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "navbar", "XHYyMaLOYnYvwDxUQURn");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogo(data.logo || "");
          setLeftSideButton(data.leftSideButton || "");
          setRightSideButton(data.rightSideButton || "");
          setBottomLeftLink(data.bottomLeftLink || "");
          setBottomRightLink(data.bottomRightLink || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching navbar data");
        console.error("Error fetching navbar data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);
  return (
    <div>
      <div className="border-b-[1px] border-[var(--line)] md:py-2 py-7">
        <div className="wrapper flex justify-between items-center relative">
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
              <div className="animate-pulse h-[100px] leading-[100px]">
                Loading...
              </div>
            )}
          </Link>
          <div className="flex gap-3">
            {buttons && (
              <>
                <Button
                  content={leftSideButton}
                  className="!bg-[var(--btn-black)] hover:!bg-[var(--btn-hover-bg)]"
                  link="/join"
                />
                <Button content={rightSideButton} link="/donate" />
              </>
            )}
          </div>
        </div>
      </div>
      {buttons && (
        <div className="wrapper flex py-3 items-center gap-9 text-[14.4px] text-[var(--link)] font-semibold">
          <Link href="/join" className="hover:text-[var(--btn-black)]">
            {bottomLeftLink}
          </Link>
          <Link href="/strategy" className="hover:text-[var(--btn-black)]">
            {bottomRightLink}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
