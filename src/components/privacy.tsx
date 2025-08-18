"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function Privacy() {
  const [title, setTitle] = useState("Loading...");
  const [lastUpdate, setLastUpdate] = useState("Loading...");
  const [intro, setIntro] = useState("Loading...");
  const data = [
    {
      qes: "Why do we collect your data?",
      intro:
        "We collect your personal data to provide better services, improve user experience, and ensure compliance with legal obligations.",
      points: [
        "To deliver and improve our services",
        "To personalize your experience on our platform",
        "To communicate important updates and notifications",
        "To comply with regulatory and legal requirements",
      ],
    },
    {
      qes: "What type of data do we collect?",
      intro:
        "The information we collect depends on how you use our services. It may include personal, technical, and usage data.",
      points: [
        "Personal details (such as name, email, and contact information)",
        "Login and account information",
        "Device and browser details",
        "Usage data such as pages visited, time spent, and interactions",
      ],
    },
    {
      qes: "How do we use your data?",
      intro:
        "We only use your data for legitimate business purposes and to maintain a secure and reliable service.",
      points: [
        "To provide and manage your account",
        "To process payments and transactions",
        "To improve our website, features, and security",
        "To send service-related notifications and updates",
        "To protect against fraud, misuse, or unauthorized access",
      ],
    },
    {
      qes: "How do we protect your data?",
      intro:
        "We implement strict security measures to ensure your data is safe from unauthorized access or misuse.",
      points: [
        "Encryption of sensitive data",
        "Regular monitoring and security audits",
        "Restricted access to personal information",
        "Compliance with industry security standards",
      ],
    },
    {
      qes: "What are your rights?",
      intro:
        "You have the right to manage your personal data and control how it is used.",
      points: [
        "Right to access, update, or delete your data",
        "Right to withdraw consent at any time",
        "Right to request a copy of your personal data",
        "Right to file a complaint with data protection authorities",
      ],
    },
  ];

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
        {data.map((item, i) => (
          <div key={i}>
            <p className="font-bold mt-5 mb-2">
              {i + 1}. {item.qes}
            </p>
            <p>{item.intro}</p>
            <ul className="ps-7 list-disc mt-5">
              {item.points.map((item, i) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
