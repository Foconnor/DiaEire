"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  faSquareFacebook,
  faXTwitter,
  faYoutube,
  faInstagram,
  faLinkedin,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Footer() {
  const [fbookLink, setFbookLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [YTLink, setYTLink] = useState("");
  const [XLink, setXLink] = useState("");
  const [LINLink, setLINLink] = useState("");
  const [TTLink, setTTLink] = useState("");
  const [copyright, setCopyright] = useState("Loading...");
  const [poweredText, setPoweredText] = useState("Loading...");
  const [poweredLink, setPoweredLink] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [pageLinks, setPageLinks] = useState([
    {
      name: "",
      url: "",
    },
  ]);
  const Icons = [
    {
      icon: faSquareFacebook,
      link: fbookLink,
    },
    { icon: faInstagram, link: instaLink },
    { icon: faYoutube, link: YTLink },
    { icon: faXTwitter, link: XLink },
    {
      icon: faLinkedin,
      link: LINLink,
    },
    { icon: faTiktok, link: TTLink },
    { icon: faWhatsapp, link: whatsappLink },
  ];

  useEffect(() => {
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "footer", "footerContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFbookLink(data.fbookLink || "");
          setInstaLink(data.instaLink || "");
          setYTLink(data.YTLink || "");
          setXLink(data.XLink || "");
          setLINLink(data.LINLink || "");
          setTTLink(data.TTLink || "");
          setWhatsappLink(data.whatsappLink || "");
          setCopyright(data.copyright || "");
          setPoweredText(data.poweredText || "");
          setPoweredLink(data.poweredLink || "");
          setPageLinks(data.pageLinks || []);
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching footer data");
        console.error("Error fetching footer data:", error);
      }
    };
    getSectionData();
  }, []);

  return (
    <div className="max-w-[1200px] w-[95%] m-auto md:py-[30px] pb-5 md:pb-0">
      <div className="flex items-center gap-[1.33rem] text-[var(--grey-300)] md:justify-center">
        {Icons.map((item, index) => (
          <Link key={index} href={item.link}>
            <FontAwesomeIcon
              className="hover:text-[var(--primary)] cursor-pointer transition-all duration-300 ease-in-out"
              icon={item.icon}
              size="xl"
            />
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-x-[1.33rem] gap-y-1 md:justify-center justify-start pt-3 flex-wrap">
        <p className="links hover:!no-underline">{copyright}</p>
        {pageLinks.map((link, index) => (
          <a key={index} href={link.url} className="links">
            {link.name}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-y-1 gap-x-1 md:justify-center justify-start pt-1 pb-1 flex-wrap">
        <p className="links hover:!no-underline">Powered By</p>
        <a href={poweredLink} className="links">
          {poweredText}
        </a>
      </div>
    </div>
  );
}

export default Footer;
