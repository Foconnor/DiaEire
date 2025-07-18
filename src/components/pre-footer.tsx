"use client";
import Image from "next/image";
import React, { useState } from "react";

function PreFooter() {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowingOne, setIsShowingOne] = useState(false);
  const [isShowingTwo, setIsShowingTwo] = useState(false);
  const [isShowingThree, setIsShowingThree] = useState(false);
  const [isShowingFour, setIsShowingFour] = useState(false);
  const [isShowingFive, setIsShowingFive] = useState(false);
  const [isShowingSix, setIsShowingSix] = useState(false);
  const [isShowingSeven, setIsShowingSeven] = useState(false);
  return (
    <div className="md:border-y-[1px] border-[var(--line)] py-[30px] mt-[70px]">
      <div className="grid md:grid-cols-6 grid-cols-1 max-w-[1200px] w-[95%] m-auto">
        <div className="md:px-3 relative">
          <Image
            style={{ filter: "grayscale(100%)" }}
            className="absolute md:-left-[30px] md:-top-[10px] -top-[70px] -left-[27px] md:w-fit md:h-fit w-[300px] h-[65px]"
            src="/images/logo.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-y-[1px] border-[var(--line)] py-2 md:py-0 md:border-none mt-5  md:mt-0 cursor-pointer md:cursor-default"
            onClick={() => setIsShowing((prev) => !prev)}
          >
            <p className="link-heading">Campaign</p>
            <a
              href=""
              className={`links  md:block ${isShowing ? "block" : "hidden"}`}
            >
              Volunteer
            </a>
            <a
              href=""
              className={`links  md:block ${isShowing ? "block" : "hidden"}`}
            >
              Learn about campaigning
            </a>
            <a
              href=""
              className={`links  md:block ${isShowing ? "block" : "hidden"}`}
            >
              Fund our campaign
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setIsShowingTwo((prev) => !prev)}
          >
            <p className="link-heading">People</p>
            <a
              href=""
              className={`links  md:block ${isShowingTwo ? "block" : "hidden"}`}
            >
              Meet the team
            </a>
          </div>
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default md:mt-6 mt-0"
            onClick={() => setIsShowingThree((prev) => !prev)}
          >
            <p className="link-heading">Updates</p>
            <a
              href=""
              className={`links  md:block ${
                isShowingThree ? "block" : "hidden"
              }`}
            >
              Latest from our campaign
            </a>
            <a
              href=""
              className={`links  md:block ${
                isShowingThree ? "block" : "hidden"
              }`}
            >
              Members updates
            </a>
            <a
              href=""
              className={`links  md:block ${
                isShowingThree ? "block" : "hidden"
              }`}
            >
              Press releases
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setIsShowingFour((prev) => !prev)}
          >
            <p className="link-heading">About Us</p>
            <a
              href=""
              className={`links  md:block ${
                isShowingFour ? "block" : "hidden"
              }`}
            >
              How we work
            </a>
            <a
              href=""
              className={`links  md:block ${
                isShowingFour ? "block" : "hidden"
              }`}
            >
              Groups
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setIsShowingSix((prev) => !prev)}
          >
            <p className="link-heading">Events</p>
            <a
              href=""
              className={`links  md:block ${isShowingSix ? "block" : "hidden"}`}
            >
              Events 2025
            </a>
          </div>
        </div>
        <div className="md:px-3">
          <div
            className="flex flex-col border-b-[1px] border-[var(--line)] py-2 md:py-0 md:border-none cursor-pointer md:cursor-default"
            onClick={() => setIsShowingSeven((prev) => !prev)}
          >
            <p className="link-heading">Others</p>
            <a
              href=""
              className={`links  md:block ${
                isShowingSeven ? "block" : "hidden"
              }`}
            >
              Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreFooter;
