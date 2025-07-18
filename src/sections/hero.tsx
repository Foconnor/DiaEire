import Button from "@/components/common/button";
import React from "react";

function Hero() {
  return (
    <div className="hero-bg">
      <div className="absolute z-10 bottom-[40px] w-screen">
        <div className="wrapper">
          <h1 className="md:text-[calc(5.475rem_+_2.25vw)] text-[calc(5.475rem_-_3vw)] font-black text-white mb-5 leading-[1.2]">
            Return Ireland
          </h1>
          <Button
            content="Our Plan To Return Ireland"
            className="!text-[1.125rem] px-[18px] py-[9px]"
            IconSize={15}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
