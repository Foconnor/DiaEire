"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

function PreFooter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="md:border-y-[1px] border-[var(--line)] py-[30px] mt-[70px]">
      <div className="grid md:grid-cols-6 grid-cols-1 max-w-[1200px] w-[95%] m-auto">
        <div className="md:px-3 relative">
          <Image
            style={{ filter: "grayscale(100%)" }}
            className="absolute 2xl:-left-[27px] xl:-left-[20px] xl:-top-[10px] md:-top-[2px] -top-[70px] -left-[0px] md:w-fit md:h-fit w-[300px] h-[65px]"
            src="/images/logo.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-y-[1px] border-[var(--line)] py-2 md:py-0 md:border-none mt-5  md:mt-0 cursor-pointer md:cursor-default"
            onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">Campaign</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href=""
              className={`links  md:block ${
                openIndex === 0 ? "block" : "hidden"
              }`}
            >
              Volunteer
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">People</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href=""
              className={`links  md:block ${
                openIndex === 1 ? "block" : "hidden"
              }`}
            >
              Meet the team
            </a>
          </div>
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default md:mt-6 mt-0"
            onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">Updates</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href=""
              className={`links  md:block ${
                openIndex === 2 ? "block" : "hidden"
              }`}
            >
              Latest from our campaign
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">About Us</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href=""
              className={`links  md:block ${
                openIndex === 3 ? "block" : "hidden"
              }`}
            >
              How we work
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">Events</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href=""
              className={`links  md:block ${
                openIndex === 4 ? "block" : "hidden"
              }`}
            >
              Events 2025
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setOpenIndex(openIndex === 5 ? null : 5)}
          >
            <div className="flex items-center justify-between">
              <p className="link-heading">Community Patriots</p>
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] md:!hidden ${
                  openIndex === 2 ? "rotate-180 " : ""
                }`}
                icon={faChevronDown}
                size="sm"
              />
            </div>
            <a
              href="https://sinneadaoine.ie/"
              className={`links  md:block ${
                openIndex === 5 ? "block" : "hidden"
              }`}
            >
              Sinne Na Daoine
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreFooter;
