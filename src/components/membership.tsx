"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import MembershipForm from "./membershipForm";

interface Dropdown {
  id: string;
  title: string;
  points: { text: string }[];
}

function Membership() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Loading...");
  const [subTitle, setSubTitle] = useState("Loading...");
  const [pointOne, setPointOne] = useState("Loading...");
  const [pointTwo, setPointTwo] = useState("Loading...");
  const [pointThree, setPointThree] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [paraThree, setParaThree] = useState("Loading...");
  const [paraFour, setParaFour] = useState("Loading...");
  const [name, setName] = useState("Loading...");
  const [buttonText, setButtonText] = useState("Loading...");
  const [image, setImage] = useState("");
  const [dropdowns, setDropdowns] = useState<Dropdown[]>([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

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
    setTimeout(() => {
      setIsModelOpen(true);
      setLoading(false);
    }, 2000);
  };
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const Reasons = [
    {
      point: pointOne,
    },
    {
      point: pointTwo,
    },
    {
      point: pointThree,
    },
  ];

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const dropdownColRef = collection(
          db,
          "membershipPage",
          "membershipPageContent",
          "Dropdown"
        );
        const querySnapshot = await getDocs(dropdownColRef);
        const dropdownArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { title: string; points: { text: string }[] }),
        }));
        setDropdowns(dropdownArr);
      } catch (error) {
        toast.error("Error fetching dropdowns");
        console.error("Error fetching dropdowns:", error);
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "joinPage", "joinPageContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setParaThree(data.paraOne || "");
          setParaFour(data.paraTwo || "");
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

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "membershipPage", "membershipPageContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setImage(data.image || "");
          setTitle(data.title || "");
          setSubTitle(data.subTitle || "");
          setPointOne(data.pointOne || "");
          setPointTwo(data.pointTwo || "");
          setPointThree(data.pointThree || "");
          setParaOne(data.paraOne || "");
          setParaTwo(data.paraTwo || "");
          setName(data.name || "");
          setButtonText(data.buttonText || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching membership page data");
        console.error("Error fetching membership page data:", error);
      }
    };
    getSectionData();
  }, []);

  return (
    <div className="max-w-[600px] mx-auto bg-[var(--grey)] my-5 rounded-lg">
      {isModelOpen ? (
        <MembershipForm />
      ) : (
        <>
          <div
            className="membership-bg  relative"
            style={{ backgroundImage: `url(${image})` }}
          >
            <h2 className="p-5 text-[var(--background)] absolute bottom-0 left-0 z-10 text-[32px] leading-tight font-bold">
              {title}
            </h2>
          </div>

          <div className="px-5 mt-6">
            <p className="font-bold text-lg">{subTitle}</p>
            <ul className="px-5 mt-5 mb-[10px]">
              {Reasons.map((item, index) => (
                <li key={index} className="list-disc text-[var(--grey-300)]">
                  {item.point}
                </li>
              ))}
            </ul>
            <p className="text-[var(--grey-300)]">{paraOne}</p>
            <p className="text-[var(--grey-300)] mt-[10px]">{paraTwo}</p>
            <p className="font-bold text-[var(--grey-300)] mt-[10px]">{name}</p>
            <button
              onClick={() => {
                router.push("/join");
              }}
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer"
            >
              {buttonText}
            </button>
            <div className="my-10">
              {dropdowns?.map((item, index) => (
                <div
                  key={index}
                  className="border-b-[1px] border-[var(--line)]"
                >
                  <div
                    className="px-4 py-5 flex items-center justify-between cursor-pointer"
                    onClick={() => {
                      setOpenIndex(openIndex === index ? null : index);
                    }}
                  >
                    <p>{item.title}</p>
                    <FontAwesomeIcon
                      className={openIndex === index ? "rotate-180" : ""}
                      icon={faChevronDown}
                    />
                  </div>
                  <div
                    className={`px-4 pb-5 flex-col gap-[10px] ${
                      openIndex === index ? "flex" : "hidden"
                    }`}
                  >
                    {item.points.map((item, index) => (
                      <p key={index} className="text-[var(--grey-300)]">
                        {item.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
              <p className="mt-6 text-sm text-[var(--grey-300)]">{paraThree}</p>
              <p className="mt-6 text-sm text-[var(--grey-300)]">{paraFour}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Membership;
