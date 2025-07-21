import React from "react";
import Button from "./common/button";
import Link from "next/link";
import Image from "next/image";

function Navbar({ buttons = true }: { buttons?: boolean }) {
  return (
    <div>
      <div className="border-b-[1px] border-[var(--line)] md:py-2 py-7">
        <div className="wrapper flex justify-between items-center relative">
          <a href="/">
            <Image
              className="md:w-fit md:h-fit w-[160px]"
              src="/images/logo.png"
              alt=""
              width={350}
              height={350}
            />
          </a>
          <div className="flex gap-3">
            {buttons && (
              <>
                <Button
                  content="Join"
                  className="!bg-[var(--btn-black)] hover:!bg-[var(--btn-hover-bg)]"
                  link="/join"
                />
                <Button content="Donate" />
              </>
            )}
          </div>
        </div>
      </div>
      {buttons && (
        <div className="wrapper flex py-3 items-center gap-9 text-[14.4px] text-[var(--link)] font-semibold">
          <Link href="/" className="hover:text-[var(--btn-black)]">
            Join Dia le hÉireann
          </Link>
          <Link href="/" className="hover:text-[var(--btn-black)]">
            Our People
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
