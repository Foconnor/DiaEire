import Button from "@/components/common/button";
import React from "react";

function Fund() {
  return (
    <div className="wrapper">
      <div className="fund-bg mt-[100px] mb-[50px]">
        <div className="relative z-10 p-[30px] h-full">
          <div className="absolute bottom-[30px] md:static">
            <div className="md:absolute left-[30px] bottom-[30px] mb-5">
              <h3 className="text-white max-w-[600px] text-[calc(1.44rem_+_1.9vw)] leading-[1.2]">
                Help build Dia le hÉireann campaign fund
              </h3>
              <p className="text-white max-w-[300px] mt-4 text-[1.125rem]">
                Donate now and together we can change Ireland.
              </p>
            </div>
            <Button
              content="I'll chip in"
              className="!text-xl md:absolute right-[30px] bottom-[30px] !px-[18px] !py-[9px]"
              IconSize={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fund;
