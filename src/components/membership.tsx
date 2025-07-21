"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function Membership() {
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
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const Reasons = [
    {
      point:
        "As a member, you’ll join hundreds of thousands of people who are dedicated to building a fairer Britain.",
    },
    {
      point:
        "We’ll provide you with all the tools and resources to get involved in exciting events and campaign days, shape policy and meet like-minded people.",
    },
    {
      point:
        "And one day you could even stand for election as an official Labour Party candidate yourself!",
    },
  ];

  const DropDown = [
    {
      title: "What can i do if i join",
      points: [
        {
          text: "As a Labour member, you’ll be alongside hundreds of thousands of people across Britain, dedicated to putting the country first.",
        },
        {
          text: "We’ll provide you with all the tools and resources to get involved in events and campaign days, to help elect Labour candidates.",
        },
        {
          text: "And if you want to, one day, you can even stand for election as an official Labour Party candidate yourself.",
        },
      ],
    },
    {
      title: "Am I eligible to join?",
      points: [
        {
          text: "If you’re 14 or over, not a member of another political party, and are a British citizen or have lived in the UK for a year or more, then absolutely; come on in. We need your passion, your experience and your voice.",
        },
      ],
    },
    {
      title: "Where is my money going?",
      points: [
        {
          text: "We’re built on the contributions of our many dedicated members. Your membership fees pay for the posters, leaflets, rallies and events that you see up and down the country. Every penny is put to good use. Without our members’ contributions, we simply wouldn’t be able to run the Labour Party.",
        },
      ],
    },
    {
      title: "What happens after I join?",
      points: [
        {
          text: "Keep an eye out for a membership pack in the post. Your membership card is in there – along with a whole host of useful information about what you can get involved in. As soon as that arrives, you’ll be a card-carrying member of the Labour Party.",
        },
      ],
    },
    {
      title: "What can I do as a member?",
      points: [
        {
          text: "You’ll have a say in our policies and vote in internal elections. We’ll provide you with all the tools and resources to get involved in events, campaign days and rallies and introduce you to a huge movement of other like-minded members.",
        },
        {
          text: "By joining, you’ll also become a part of your local Labour Party, who will be in touch with ways you can get involved with loads of different campaigns and events near you. You can get involved in everything from policy making to campaigning to social events right away.",
        },
      ],
    },
  ];
  return (
    <div className="max-w-[600px] mx-auto bg-[var(--grey)] my-5 rounded-lg">
      <div className="membership-bg relative">
        <h2 className="p-5 text-[var(--background)] absolute bottom-0 left-0 z-10 text-[32px] leading-tight font-bold">
          What is Dia le hÉireann membership?
        </h2>
      </div>

      <div className="px-5 mt-6">
        <p className="font-bold text-lg">
          What you need to know about joining the Dia le hÉireann Party
        </p>
        <ul className="px-5 mt-5 mb-[10px]">
          {Reasons.map((item, index) => (
            <li key={index} className="list-disc text-[var(--grey-300)]">
              {item.point}
            </li>
          ))}
        </ul>
        <p className="text-[var(--grey-300)]">
          <b>
            “I joined the Labour Party after the BNP won council seats in the
            area I grew up and lived in.
          </b>{" "}
          I found a community of members and councillors who shared my values
          and were fighting hard to stop the far right.
        </p>
        <p className="text-[var(--grey-300)] mt-[10px]">
          Ever since then, I've got the campaigning bug and I haven’t looked
          back. Being a Labour member is about being part of a team of hundreds
          of thousands, all working together to build a better society and
          country.”
        </p>
        <p className="font-bold text-[var(--grey-300)] mt-[10px]">
          Hollie Ridley, General Secretary
        </p>
        <button
          onClick={() => {
            router.push("/join");
          }}
          className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer"
        >
          Join today!
        </button>
        <div className="my-10">
          {DropDown.map((item, index) => (
            <div key={index} className="border-b-[1px] border-[var(--line)]">
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
        </div>
      </div>
    </div>
  );
}

export default Membership;
