"use client";
import Button from "@/components/common/button";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebaseConfig";

function Hero() {
  const [loading, setLoading] = React.useState(true);
  const [heroTitle, setHeroTitle] = React.useState("");
  const [heroButtonText, setHeroButtonText] = React.useState("");
  const [heroImage, setHeroImage] = React.useState("");
  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroTitle(data.heroTitle || "");
          setHeroButtonText(data.buttonText || "");
          setHeroImage(data.backgroundImage || "");
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
    <div className="hero-bg" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute z-10 bottom-[40px] w-screen">
        <div className="wrapper">
          <h1 className="md:text-[calc(5.475rem_+_2.25vw)] text-[calc(5.475rem_-_3vw)] font-black text-white mb-5 leading-[1.2]">
            {loading ? (
              <span className="inline-block h-[70px] w-2/3 bg-gray-300/40 rounded animate-pulse"></span>
            ) : (
              heroTitle
            )}
          </h1>
          <Button
            content={
              loading ? (
                <span className="inline-block px-3 py-1 w-full rounded animate-pulse">Loading...</span>
              ) : (
                heroButtonText
              )
            }
            className="!text-[1.125rem] px-[18px] py-[9px]"
            IconSize={15}
            link="/join"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
