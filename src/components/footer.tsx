import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faSquareFacebook,
  faXTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Footer() {
  const Icons = [
    { icon: faSquareFacebook, link: "/" },
    { icon: faInstagram, link: "/" },
    { icon: faYoutube, link: "/" },
    { icon: faXTwitter, link: "/" },
    { icon: faLink, link: "/" },
  ];
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
        <p className="links hover:!no-underline">
          Copyright 2025 Dia le hÉireann All Rights Reserved
        </p>
        <a href="" className="links">
          Terms and Conditions
        </a>
        <a href="/privacy" className="links">
          Privacy
        </a>
        <a href="/privacy#cookies" className="links">
          Cookie Policy
        </a>
        <a href="" className="links">
          Cookie Preferences
        </a>
      </div>
    </div>
  );
}

export default Footer;
