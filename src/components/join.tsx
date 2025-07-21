import React from "react";
import Button from "./common/button";

function Join() {
  return (
    <div className="max-w-[600px] mx-auto bg-[var(--grey)] my-5 rounded-lg">
      <div className="join-bg relative">
        <h2 className="p-5 text-[var(--background)] absolute bottom-0 left-0 z-10 text-[32px] leading-tight font-bold">
          Join <br /> the Dia le hÉireann
        </h2>
      </div>

      <div className="px-5 mt-6">
        <p className="font-bold text-lg">Change has begun, be part of it.</p>
        <p className="mt-5 mb-10 text-[var(--grey-300)]">
          Join hundreds of thousands of party members as we fix the foundations
          and rebuild Ireland. Email address
        </p>
        <div className="p-4 pb-10">
          <input
            className="w-full rounded-md  border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
          />
          <button className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer">
            Get started
          </button>
          <p className="mt-6 text-sm text-[var(--grey-300)]">
            Read more about how we use your data in our{" "}
            <a href="" className="underline">
              Privacy Notice.
            </a>{" "}
            You can unsubscribe at any time.
          </p>
          <p className="mt-6 text-sm text-[var(--grey-300)]">
            Payments securely processed by GoCardless. GoCardless Ltd (company
            registration number 07495895) is authorised by the Financial Conduct
            Authority under the Payment Services Regulations 2017, registration
            number 597190, for the provision of payment services. GoCardless
            uses personal data as described in their{" "}
            <a href="" className="underline">
              Privacy Notice.
            </a>
          </p>
          <a
            href=""
            className="mt-8 px-4 py-5 flex flex-col justify-between gap-y-5 bg-[var(--background)] rounded-lg border-[1px] border-[var(--line)]"
          >
            <p className="font-bold text-lg">What is Dia le hÉireann?</p>
            <Button
              content="Learn more"
              className="!bg-[var(--backgorund)] !text-[var(--primary)] !p-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Join;
