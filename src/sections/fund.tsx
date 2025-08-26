"use client";
import Button from "@/components/common/button";
import React, { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function Fund() {
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [buttonText, setButtonText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageFund");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setButtonText(data.buttonText || "");
          setImage(data.image || "");
          setTagline(data.tagline || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);
  return (
    <div className="wrapper">
      <div className="fund-bg mt-[100px] mb-[50px]" style={{ backgroundImage: `url(${image})` }}>
        <div className="relative z-10 p-[30px] h-full">
          <div className="absolute bottom-[30px] md:static">
            <div className="md:absolute left-[30px] bottom-[30px] mb-5">
              <h3 className="text-white max-w-[600px] text-[calc(1.44rem_+_1.9vw)] leading-[1.2]">
                {loading ? (
                  <span className="inline-block h-[70px] w-2/3 bg-gray-300/40 rounded animate-pulse"></span>
                ) : (
                  title
                )}
              </h3>
              <p className="text-white max-w-[300px] mt-4 text-[1.125rem]">
                {loading ? (
                  <span className="inline-block h-[20px] w-full bg-gray-300/40 rounded animate-pulse"></span>
                ) : (
                  tagline
                )}
              </p>
            </div>
            <Button
              content={
                loading ? (
                  <span className="inline-block px-3 py-0.5 w-full rounded animate-pulse">
                    Loading...
                  </span>
                ) : (
                  buttonText
                )
              }
              className="!text-xl md:absolute right-[30px] bottom-[30px] !px-[18px] !py-[9px]"
              IconSize={16}
              link="/donate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fund;
