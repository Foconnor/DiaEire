"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

function Privacy() {
  const [title, setTitle] = useState("Loading...");
  const [lastUpdate, setLastUpdate] = useState("Loading...");
  const [intro, setIntro] = useState("Loading...");
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "privacy", "privacyPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading...");
          setLastUpdate(data.lastUpdated || "Loading...");
          setIntro(data.intro || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching privacy page data");
        console.error("Error fetching privacy page data:", error);
      }
    };
    getSectionData();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionColRef = collection(
          db,
          "privacy",
          "privacyPage",
          "questions"
        );
        const querySnapshot = await getDocs(questionColRef);
        const dropdownArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as {
            question: string;
            awnser: string;
            points: { text: string }[];
          }),
        }));
        setQuestions(dropdownArr);
      } catch (error) {
        toast.error("Error fetching questoins");
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <div className="md:h-[240px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
        <div className="wrapper">
          <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)]">
            {title}
          </h1>
        </div>
      </div>
      <div className="md:pt-12 pt-6 md:max-w-[1000px] px-4 md:px-0 mx-auto">
        <p className="mb-4">Last Updated: {lastUpdate}</p>
        <p>{intro}</p>
        {questions?.map((item, i) => (
          <div key={i}>
            <p className="font-bold mt-5 mb-2">
              {i + 1}. {item.question}
            </p>
            <p>{item.awnser}</p>
            <ul className="ps-7 list-disc mt-5">
              {item.points.map((item: any, i: any) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div id="cookies" className="mt-10">
          <h2 className="font-bold text-xl mb-3">Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience,
            analyze traffic, and personalize content. Cookies are small text
            files stored on your device when you visit our website.
          </p>
          <ul className="ps-7 list-disc mt-4">
            <li>Essential cookies – required for site functionality</li>
            <li>Analytics cookies – help us understand usage patterns</li>
            <li>Preference cookies – remember your choices/settings</li>
            <li>Marketing cookies – used for personalized ads</li>
          </ul>
          <p className="mt-4">
            You can manage or disable cookies through your browser settings.
            Learn more in our full Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
