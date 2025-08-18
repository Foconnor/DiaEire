"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";

function page() {
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [paraThree, setParaThree] = useState("Loading...");
  const [paraFour, setParaFour] = useState("Loading...");
  const [paraFive, setParaFive] = useState("Loading...");
  const [hTextOne, setHTextOne] = useState("Loading...");
  const [hTextTwo, setHTextTwo] = useState("Loading...");
  const [hTextThree, setHTextThree] = useState("Loading...");
  const [hTextFour, setHTextFour] = useState("Loading...");
  const [hTextFive, setHTextFive] = useState("Loading...");

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "strategy", "strategyPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading");
          setImg(data.img || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
          setParaThree(data.paraThree || "Loading...");
          setParaFour(data.paraFour || "Loading...");
          setParaFive(data.paraFive || "Loading...");
          setHTextOne(data.hTextOne || "Loading...");
          setHTextTwo(data.hTextTwo || "Loading...");
          setHTextThree(data.hTextThree || "Loading...");
          setHTextFour(data.hTextFour || "Loading...");
          setHTextFive(data.hTextFive || "Loading...");
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
  return (
    <div>
      <Navbar />
      <div className="md:h-[220px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.9vw)] text-[var(--primary)] max-w-[600px]">
            {title}
          </h1>
        </div>
      </div>
      <div className="w-full h-full">
        {img !== "Loading..." ? (
          <img
            className="w-full"
            src={img}
            alt="background image"
            width={300}
            height={300}
          />
        ) : (
          <div className="h-[50vh] bg-[var(--grey-300)] animate-pulse" />
        )}
      </div>
      <div className="md:p-14 p-8 flex flex-col gap-6">
        <p className="max-w-[1000px] mx-auto">{paraOne}</p>
        <p className="max-w-[1000px] mx-auto">{paraTwo}</p>
        <p className="max-w-[1000px] mx-auto min-w-[1000px]">{paraThree}</p>
      </div>
      <div className="md:p-14 p-8 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)] max-w-[1000px] mx-auto">{hTextOne}</p>
      </div>
      <div className="md:p-14 p-8">
        <p className="text-[calc(1.305rem_+_.55vw)] max-w-[1000px] mx-auto">{hTextTwo}</p>
      </div>
      <div className="md:p-14 p-8 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)] max-w-[1000px] mx-auto">{hTextThree}</p>
      </div>
      <div className="md:p-14 p-8">
        <p className="text-[calc(1.305rem_+_.55vw)] max-w-[1000px] mx-auto">{hTextFour}</p>
      </div>
      <div className="md:p-14 p-8 bg-[var(--primary)] text-white ">
        <p className="text-[calc(1.305rem_+_.55vw)] max-w-[1000px] mx-auto">{hTextFive}</p>
      </div>
      <div className="md:p-14 p-8 flex flex-col gap-6">
        <p className="max-w-[1000px] mx-auto">{paraFour}</p>
        <p className="max-w-[1000px] mx-auto">{paraFive}</p>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
