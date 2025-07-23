"use client";
import { useRef, useState } from "react";
import JoinLabour from "@/../public/images/ireland.jpg";
import EditButton from "@/components/common/editButton";
import Image from "next/image";

function LabourEdit() {
  const [isActive, setActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const Items = [
    {
      keys: "Join Dia le hÉireann",
      title: "Join Dia le hÉireann",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/join",
      linkName: "I want to join",
      img: JoinLabour,
    },
    {
      keys: "Head from Dia le hÉireann",
      title: "Hear from us",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "Sign me up",
      img: JoinLabour,
    },
    {
      keys: "Read our missions",
      title: "Read our missions",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "I'll read more",
      img: JoinLabour,
    },
    {
      keys: "Read our Plan for Change",
      title: "Read our Plan for Change",
      des: "Dia le hÉireann is made up of hundreds of thousands of members, coming together to get Ireland's future back. By joining, you can get involved with your local party, campaign with us on the issues you care about and make sure your voice is heard.",
      link: "/",
      linkName: "I'll read the plan",
      img: JoinLabour,
    },
  ];

  const SecondSectionTitle = "Want to get involved? Here's what you can do";

    function handleEdit() {
    console.log("Edit button clicked");
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Second Section</h2>
        <EditButton onClick={handleEdit} /> 
      </div>
      <div className="grid grid-cols-2 mt-4">
        <p className="text-[var(--primary)]">Second Section Title :</p>
        <p>{SecondSectionTitle}</p>
      </div>
      {Items.map((item, index) => (
        <div key={index} className="border-t-[1px] border-[var(--line)] pb-4 mt-4">
             <h2 className="text-lg mt-2">Slider {index + 1}</h2>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)] whitespace-nowrap">Slider Key :</p>
            <p>{item.keys}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Title :</p>
            <p>{item.title}</p>
          </div>
          <div className="grid grid-cols-2  mt-4">
            <p className="text-[var(--primary)] whitespace-nowrap">Slider para :</p>
            <p>{item.des}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Button :</p>
            <p>{item.linkName}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Image :</p>
            <Image src={item.img} alt="slider image" width={200} height={200} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabourEdit;
