"use client";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import countries from "world-countries";

interface Props {
  email: string;
  isChecked: boolean;
}

function MembershipForm({ email, isChecked }: Props) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [popularMoney, setPopularMoney] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const [membershipAmount, setMembershipAmount] = useState(0);
  const [extraDonation, setExtraDonation] = useState(0);
  const [activeDonationValue, setActiveDonationValue] = useState(0);
  const [isCurrentlyMember, setIsCurrentlyMember] = useState(false);

  const [formData, setFormData] = useState({
    email: email,
    isExistingMember: isChecked,
    membershipAmount: membershipAmount,
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: {
      date: "",
      month: "",
      year: "",
    },
    phoneNumber: "",
    isCurrentlyMember: false,
    previousParty: "",
    postalCode: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    country: "ireland",
    extraDonation: extraDonation,
    subscriptionType: 0,
  });

  useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    membershipAmount,
  }));
}, [membershipAmount]);

  const [extraMoney, setExtraMoney] = useState<number[]>([]);

  const [previousParty, setPreviousParty] = useState<string[]>([]);
  const [para, setPara] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [paraThree, setParaThree] = useState("Loading...");
  const [paraFour, setParaFour] = useState("Loading...");
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "form", "FormContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPara(data.para || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
          setParaThree(data.paraThree || "Loading...");
          setParaFour(data.paraFour || "Loading...");
          setTitle(data.title || "Loading...");
          setMembershipAmount(data.membershipAmount || 0);
          setPopularMoney(data.popularExtraDonation || 0);
          setExtraMoney(
            Array.isArray(data.extraDonation) ? data.extraDonation : []
          );
          setPreviousParty(
            Array.isArray(data.previousParty) ? data.previousParty : []
          );
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching form data");
        console.error("Error fetching form data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prevStep) => prevStep + 1);
    }, 2000);
  };

  const handleSubmitLastStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save form data to Firestore
      await addDoc(collection(db, "members"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      // 2. Create Stripe checkout session with dynamic amount
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipAmount,
          extraDonation,
          paymentType,
          email: formData.email,
        }),
      });

      const data = await res.json();

      if (data?.url) {
        toast.success(
          `Redirecting to payment... Your total: €${
            membershipAmount + extraDonation
          }`
        );
        window.location.href = data.url;
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error.message);
      } else {
        console.error("Unknown error submitting form:", error);
      }
    }
  };

  useEffect(() => {
    if (paymentType === 1) {
      setMembershipAmount(membershipAmount * 12);
      setExtraDonation(extraDonation * 12);
      setFormData((prev) => ({
        ...prev,
        subscriptionType: 1,
        extraDonation: extraDonation,
        membershipAmount: membershipAmount,
      }));
    } else {
      setMembershipAmount(5);
      setExtraDonation(activeDonationValue);
      setFormData((prev) => ({
        ...prev,
        subscriptionType: 0,
        extraDonation: extraDonation,
        membershipAmount: membershipAmount,
      }));
    }
  }, [paymentType]);

  const handleBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const formattedCountries = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
  }));

  return (
    <div className="md:min-h-[calc(100vh_-_170px)] relative min-h-[calc(100vh_+_60px)]">
      {step !== 0 && (
        <p
          className="absolute left-5 top-5 text-sm cursor-pointer"
          onClick={handleBack}
        >
          ← Back
        </p>
      )}
      <div className="md:px-20 px-10 pb-10 pt-14 flex justify-center items-center w-full">
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
                €{membershipAmount}{" "}
                <span className="text-xs font-bold uppercase text-[var(--link)]">
                  /mo
                </span>{" "}
              </p>
              <p className="text-[var(--primary)] font-semibold text-lg">
                Dia le hÉireann Membership
              </p>
              <p className="text-[var(--primary)]">Standard</p>
            </div>
          </div>
          <div className="absolute bottom-5 w-full px-5">
            <p className="text-xs text-[var(--grey-300)]">{para}</p>
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
                Title
              </label>
              <select
                id="title"
                name="title"
                className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                required
                defaultValue={"select"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: {
                          ...prev.dateOfBirth,
                          date: e.target.value,
                        },
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: {
                          ...prev.dateOfBirth,
                          month: e.target.value,
                        },
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: {
                          ...prev.dateOfBirth,
                          year: e.target.value,
                        },
                      }))
                    }
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--grey-300)]">{paraOne}</p>
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="firstName"
              >
                Phone number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                placeholder="Enter your phone number"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                required
              />
            </div>
            <p className="text-sm text-[var(--grey-300)]">{paraTwo}</p>
            <div className="flex flex-col gap-y-2.5">
              <label
                className="text-sm font-semibold block text black"
                htmlFor="firstName"
              >
                Are you current member of any political party?
              </label>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  id="yes"
                  name="currentMember"
                  value="true"
                  onChange={(e) => {
                    const checkedValue = e.target.value === "true";
                    setIsCurrentlyMember(checkedValue);
                    setFormData((prev) => ({
                      ...prev,
                      isCurrentlyMember: checkedValue,
                    }));
                  }}
                />
                <label htmlFor="yes">Yes</label>

                <input
                  type="radio"
                  id="no"
                  name="currentMember"
                  value="false"
                  onChange={(e) => {
                    const checkedValue = e.target.value === "true";
                    setIsCurrentlyMember(checkedValue);
                    setFormData((prev) => ({
                      ...prev,
                      isCurrentlyMember: checkedValue,
                    }));
                  }}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            {isCurrentlyMember && (
              <div className="flex flex-col gap-y-2.5">
                <select
                  id="title"
                  name="title"
                  className="w-full bg-[var(--background)] rounded-md border-[1px] border-[var(--line)] px-4 h-12 outline-none focus:border-[var(--primary)]"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      previousParty: e.target.value,
                    }))
                  }
                  defaultValue={"select"}
                >
                  <option value="select" disabled>
                    Select political party
                  </option>
                  {previousParty ? (
                    previousParty.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <option className="animate-pulse" value="loading" disabled>
                      loading...
                    </option>
                  )}
                  <option value="other">Other</option>
                </select>
              </div>
            )}
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
          <h2 className="font-bold text-center text-lg">Add your address</h2>

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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      addressLineOne: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      addressLineTwo: e.target.value,
                    }))
                  }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        postalCode: e.target.value,
                      }))
                    }
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
                  defaultValue={"select"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                >
                  {formattedCountries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                  <option value="select">select your country</option>
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
        </div>
      ) : step === 3 ? (
        <div className="px-5">
          <h2 className="font-bold text-center text-lg">{title}</h2>
          <p className="mt-4 text-center text-[var(--grey-300)] text-sm ">
            {formData.firstName}, {paraThree}
          </p>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
            {extraMoney.map((item, index) => (
              <button
                key={index}
                className={`rounded-lg text-2xl font-bold py-5 flex items-center justify-center relative bg-[var(--background)] border border-[var(--line)] cursor-pointer ${
                  popularMoney === item
                    ? "bg-[var(--primary-light)]"
                    : "bg-[var(--background)]"
                } ${extraDonation === item ? "ring-[3px]" : ""}`}
                onClick={() => {
                  setExtraDonation(item);
                  setActiveDonationValue(item);
                }}
              >
                {popularMoney === item && (
                  <span className="absolute bg-[var(--primary)] text-[var(--background)] text-xs rounded-full bottom-0 px-4 py-2 translate-y-1/2">
                    Most popular
                  </span>
                )}
                {item === 0 ? "no thanks" : `€${item}`}
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
          <h2 className="font-bold text-center text-lg">
            Pay by Credit / Debit Card
          </h2>
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
          <div className="md:bg-[#F0EAEA] w-full sm:max-w-[500px] mx-auto my-4 md:p-4 rounded-lg flex justify-between">
            <div className="flex flex-col items-start">
              <p>Standard rate</p>
              <p>Donation boost</p>
              <p className="font-bold mt-2">Total amount</p>
            </div>
            <div className="flex flex-col items-end">
              <p>
                €{membershipAmount.toFixed(2)}
                {paymentType === 0 ? " / mo" : " / yr"}
              </p>
              <p>
                €{extraDonation.toFixed(2)}
                {paymentType === 0 ? " / mo" : " / yr"}
              </p>
              <p className="font-bold mt-2">
                €{(membershipAmount + extraDonation).toFixed(2)}
                {paymentType === 0 ? " / mo" : " / yr"}
              </p>
            </div>
          </div>
          <div className="md:px-14 mt-10">
            <form onSubmit={handleSubmitLastStep}>
              <button
                type="submit"
                className="mt-[30px] bg-[var(--primary)] text-[var(--background)] h-[50px] w-full rounded-full hover:bg-[var(--btn-hover-bg)] transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Submitting..." : "Continue to Payment"}
              </button>
              <p className="text-xs text-[var(--grey-300)] mt-10">{paraFour}</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipForm;
