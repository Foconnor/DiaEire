"use client";
import Link from "next/link";
import React, { useState } from "react";

function MembershipForm() {
  const [loading, setLoading] = useState();
  const [step, setStep] = useState(0);
  return (
    <div className="h-[calc(100vh_-_170px)] relative">
      <div className="px-20 py-10 flex justify-center items-center w-full">
        <div className="bg-white rounded-full h-2 w-full overflow-hidden">
          <div className="w-20 h-full bg-[var(--primary)]"></div>
        </div>
      </div>
      {step === 0 ? (
        <>
          <div className="px-5">
            <h6 className="font-bold text-lg text-center">
              Pick your membership rate
            </h6>
            <div className="mt-10 border-[3px] border-black rounded-2xl p-5 flex flex-col gap-1 mb-6 cursor-pointer">
              <p className="font-bold text-3xl">
                £5.88{" "}
                <span className="text-xs font-bold uppercase text-[var(--link)]">
                  /mo
                </span>{" "}
              </p>
              <p className="text-[var(--primary)] font-semibold text-lg">
                Dia le hEireann Membership
              </p>
              <p className="text-[var(--primary)]">Standard</p>
              <p></p>
            </div>
            <Link href="" className="underline text-[var(--grey-300)]">
              Or find out if you're eligible <br /> for a reduced rate* →
            </Link>
          </div>
          <div className="absolute bottom-5 w-full px-5">
            <p className="text-xs text-[var(--grey-300)]">
              *Reduced rates are available for eligible individuals, including
              students, young people, retirees, and those with limited income.
            </p>
            <button
              type="submit"
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </>
      ) : step === 1 ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default MembershipForm;
