"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [manuallyEnterAddress, setManuallyEnterAddress] = useState(false);
  const [popularMoney, setPopularMoney] = useState(5);
  const [firstName, setFirstName] = useState("");
  const [paymentType, setPaymentType] = useState(0);
  const [membershipAmount, setMembershipAmount] = useState(5);
  const [extraDonation, setExtraDonation] = useState(0);
  const [activeDonationValue, setActiveDonationValue] = useState(0);
  const router = useRouter();

  const extraMoney = [
    { value: 50 },
    { value: 20 },
    { value: 10 },
    { value: 5 },
    { value: 3 },
    { value: 0 },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prevStep) => prevStep + 1);
    }, 2000);
  };

  const handleSubmitLastStep = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.back();
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (paymentType === 1) {
      setMembershipAmount(membershipAmount * 12);
      setExtraDonation(extraDonation * 12);
    } else {
      setMembershipAmount(5);
      setExtraDonation(activeDonationValue);
    }
  }, [paymentType]);

  const handleBack = (e: any) => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-[calc(100vh_-_170px)] relative">
      {step !== 0 && (
        <p
          className="absolute left-5 top-5 text-sm cursor-pointer"
          onClick={handleBack}
        >
          ← Back
        </p>
      )}
      <div className="px-20 pb-10 pt-14 flex justify-center items-center w-full">
        <div className="bg-white rounded-full h-2 w-full overflow-hidden">
          <div
            className="w-20 h-full bg-[var(--primary)] transition-all duration-300 ease-in-out"
            style={{ width: `${(step + 1) * 20}%` }}
          ></div>
        </div>
      </div>
      {step === 0 ? (
        <>
          <div className="px-5">
            <h6 className="font-bold text-lg text-center">
              Pick your membership rate
            </h6>
            <div
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setStep(1);
                  setLoading(false);
                }, 2000);
              }}
              className="mt-10 border-[3px] border-black rounded-2xl p-5 flex flex-col gap-1 mb-6 cursor-pointer"
            >
              <p className="font-bold text-3xl">
                ${membershipAmount}{" "}
                <span className="text-xs font-bold uppercase text-[var(--link)]">
                  /mo
                </span>{" "}
              </p>
              <p className="text-[var(--primary)] font-semibold text-lg">
                Dia le hEireann Membership
              </p>
              <p className="text-[var(--primary)]">Standard</p>
            </div>
          </div>
          <div className="absolute bottom-5 w-full px-5">
            <p className="text-xs text-[var(--grey-300)]">
              *Reduced rates are available for eligible individuals, including
              students, young people, retirees, and those with limited income.
            </p>
            <button
              type="submit"
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setStep(1);
                  setLoading(false);
                }, 2000);
              }}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </>
      ) : step === 1 ? (
        <div className="px-5 pb-5">
          <h2 className="font-bold text-center text-lg">
            Tell us a bit about yourself
          </h2>
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="title"
              >
                TItle
              </label>
              <select
                id="title"
                name="title"
                className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                required
                defaultValue={"select"}
              >
                <option value="select" disabled>
                  Select your title
                </option>
                <option value="mr">Mr.</option>
                <option value="ms">Ms.</option>
                <option value="mrs">Mrs.</option>
                <option value="miss">Miss</option>
                <option value="dr">Dr.</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-md border-[1px] bg-[var(--background)] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="flex flex-col gap-y-2.5">
              <label className="text-sm font-semibold block text-black">
                What is your date of birth?
              </label>
              <div className="flex gap-x-2">
                <div className="flex-1">
                  <label
                    className="text-sm  font-semibold block text black sr-only"
                    htmlFor="date_of_birth_day"
                  >
                    Day
                  </label>
                  <input
                    className="w-full rounded-md bg-[var(--background)] border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                    name="date_of_birth_day "
                    id="date_of_birth_day"
                    placeholder="DD"
                    type="number"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="text-sm  font-semibold block text black sr-only"
                    htmlFor="date_of_birth_month"
                  >
                    Mounth
                  </label>
                  <input
                    className="w-full rounded-md bg-[var(--background)] border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                    name="date_of_birth_month"
                    id="date_of_birth_month"
                    placeholder="MM"
                    type="number"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="text-sm  font-semibold block text black sr-only"
                    htmlFor="date_of_birth_year"
                  >
                    Year
                  </label>
                  <input
                    className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                    name="date_of_birth_year"
                    id="date_of_birth_year"
                    placeholder="YYYY"
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--grey-300)]">
              We use your date of birth to conform you meet the conditions of
              membership,to check eligibility to participate in young labour,and
              to fulfil our safeguarding obligations.
            </p>
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="firstName"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <p className="text-sm text-[var(--grey-300)]">
              We use your date of birth to conform you meet the conditions of
              membership,to check eligibility to participate in young labour,and
              to fulfil our safeguarding obligations.
            </p>
            <button
              type="submit"
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>
        </div>
      ) : step === 2 ? (
        <div className="px-5">
          <h2 className="font-bold text-center text-lg">Find your address</h2>
          {!manuallyEnterAddress ? (
            <form className="mt-12" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-2.5">
                <label
                  className="text-sm font-semibold block text black"
                  htmlFor="postalCode"
                >
                  Enter your postcode
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                  required
                  placeholder="Enter your postcode"
                />
              </div>
              <button
                type="submit"
                className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
                aria-busy={loading}
                onClick={() => {
                  setTimeout(() => {
                    setStep(2);
                  }, 2000);
                }}
              >
                {loading ? "Submitting..." : "Continue"}
              </button>
              <button
                className="mt-10 text-center underline w-full text-sm cursor-pointer"
                onClick={() => {
                  setManuallyEnterAddress(true);
                }}
              >
                Manually enter your address
              </button>
            </form>
          ) : (
            <form className="mt-12" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col gap-y-2.5">
                  <label
                    className="text-sm font-semibold block text black"
                    htmlFor="addressLine1"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                    required
                    placeholder="Enter your address line 1"
                  />
                </div>
                <div className="flex flex-col gap-y-2.5">
                  <label
                    className="text-sm font-semibold block text black"
                    htmlFor="addressLine2"
                  >
                    Address Line 2{" "}
                    <span className="text-[var(--grey-300)] font-normal text-xs">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                    placeholder="Enter your address line 2"
                  />
                </div>
                <div className="flex gap-x-2">
                  <div className="flex flex-col gap-y-2.5 w-4/5">
                    <label
                      className="text-sm font-semibold block text black"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                      placeholder="Town or City"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-y-2.5">
                    <label
                      className="text-sm font-semibold block text black"
                      htmlFor="postalCode"
                    >
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                      placeholder="Postcode"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2.5">
                  <label
                    className="text-sm font-semibold block text black"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                    required
                    defaultValue={"ireland"}
                  >
                    <option value="ireland">Ireland</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? "Submitting..." : "Continue"}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : step === 3 ? (
        <div className="px-5">
          <h2 className="font-bold text-center text-lg">
            Boost your impact and supercharge our campaigning.
          </h2>
          <p className="mt-4 text-center text-[var(--grey-300)] text-sm">
            {firstName}, thousands of members give a little extra each month to
            power our campaigning —can we count on you to do the same?{" "}
          </p>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
            {extraMoney.map((item, index) => (
              <button
                key={index}
                className={`rounded-lg text-2xl font-bold py-5 flex items-center justify-center relative bg-[var(--background)] border border-[var(--line)] cursor-pointer ${
                  popularMoney === item.value
                    ? "bg-[var(--primary-light)]"
                    : "bg-[var(--background)]"
                } ${extraDonation === item.value ? "ring-[3px]" : ""}`}
                onClick={() => {
                  setExtraDonation(item.value);
                  setActiveDonationValue(item.value);
                }}
              >
                {popularMoney === item.value && (
                  <span className="absolute bg-[var(--primary)] text-[var(--background)] text-xs rounded-full bottom-0 px-4 py-2 translate-y-1/2">
                    Most popular
                  </span>
                )}
                {item.value === 0 ? "no thanks" : `$${item.value}`}
              </button>
            ))}
          </div>
          <div className="absolute bottom-5 left-0 w-full px-5">
            <button
              type="submit"
              className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setStep(4);
                  setLoading(false);
                }, 2000);
              }}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-5">
          <h2 className="font-bold text-center text-lg">Pay by Direct Debit</h2>
          <div className="mt-8 rounded-lg bg-[var(--grey-300)] p-1 flex gap-x-1 sm:max-w-[500px] mx-auto">
            <div
              className={`h-full rounded flex-1 text-sm font-medium text-center p-1.5 cursor-pointer ${
                paymentType === 0
                  ? "bg-[var(--background)] text-[var(--foreground)]"
                  : "bg-transparent text-[var(--background)]"
              }`}
              onClick={() => {
                setPaymentType(0);
              }}
            >
              Monthly
            </div>
            <div
              className={`h-full rounded flex-1 text-sm font-medium text-center p-1.5 cursor-pointer ${
                paymentType === 1
                  ? "bg-[var(--background)] text-[var(--foreground)]"
                  : "bg-transparent text-[var(--background)]"
              }`}
              onClick={() => {
                setPaymentType(1);
              }}
            >
              Year
            </div>
          </div>
          <div className="md:bg-[#F0EAEA] w-full sm:max-w-[500px] mx-auto my-4 p-4 rounded-lg flex justify-between">
            <div className="flex flex-col items-start">
              <p>Standard rate</p>
              <p>Donation boost</p>
              <p className="font-bold mt-2">Total amount</p>
            </div>
            <div className="flex flex-col items-end">
              <p>${membershipAmount.toFixed(2)} / mo</p>
              <p>${extraDonation.toFixed(2)} / mo</p>
              <p className="font-bold mt-2">
                ${(membershipAmount + extraDonation).toFixed(2)} / mo
              </p>
            </div>
          </div>
          <div className="px-14 mt-10">
            <form onSubmit={handleSubmitLastStep}>
              <div className="flex flex-col gap-y-2.5">
                <label className="text-sm font-semibold" htmlFor="accountName">
                  Account name
                </label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                  placeholder="Enter your account name"
                  required
                />
              </div>
              <div className="flex items-center gap-x-2.5 mt-5">
                <div className="flex flex-col gap-y-2.5">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="accountNumber"
                  >
                    Account number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                    placeholder="Enter your account number"
                    required
                  />
                </div>
                <div className="flex flex-col gap-y-2.5">
                  <label className="text-sm font-semibold" htmlFor="sortCode">
                    Sort code
                  </label>
                  <input
                    type="text"
                    id="sortCode"
                    name="sortCode"
                    className="w-full rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)] bg-[var(--background)]"
                    placeholder="Enter your sort code"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-x-2 mt-3">
                <input
                  type="checkbox"
                  id="person"
                  name="person"
                  className="cursor-pointer"
                />
                <label htmlFor="person" className="text-sm cursor-pointer">
                  More than one person is required to authorise direct debits.
                </label>
              </div>
              <button
                type="submit"
                className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <p className="text-xs text-[var(--grey-300)] mt-10">
                Your payments are protected by the stripe Your payment will be
                processed by dia le heireann
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipForm;
