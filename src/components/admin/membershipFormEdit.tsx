"use client";
import EditButton from "@/components/common/editButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function MembershipFormEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membershipAmount, setMembershipAmount] = useState<number>();
  const [para, setPara] = useState("");
  const [extraDonation, setExtraDonation] = useState<number[]>([]);
  const [previousParty, setPreviousParty] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [popularExtraDonation, setPopularExtraDonation] = useState<number>();
  const [savingDropdown, setSavingDropdown] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "form", "FormContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMembershipAmount(data.membershipAmount || 0);
          setPopularExtraDonation(data.popularExtraDonation || 0);
          setExtraDonation(
            Array.isArray(data.extraDonation) ? data.extraDonation : []
          );
          setPreviousParty(
            Array.isArray(data.previousParty) ? data.previousParty : []
          );
          setPara(data.para || "");
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

  function handleEdit() {
    setIsModalOpen(true);
  }

  function closeModal() {
    if (!saving) setIsModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      membershipAmount === undefined ||
      isNaN(membershipAmount) ||
      popularExtraDonation === undefined ||
      isNaN(popularExtraDonation) ||
      extraDonation.some((d) => isNaN(d)) ||
      previousParty.some((p) => p.trim() === "") ||
      !para.trim()
    ) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    setSaving(true);
    try {
      const docRef = doc(db, "form", "FormContent");
      await updateDoc(docRef, {
        membershipAmount,
        popularExtraDonation,
        extraDonation,
        previousParty,
        para,
      });
      toast.success("Form content updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update form content.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  function handleAddDropdownPoint() {
    setPreviousParty((prev) => [...prev, ""]);
  }

  function handleRemoveDropdownPoint(idx: number) {
    setPreviousParty((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleDropdownPointChange(idx: number, value: string) {
    setPreviousParty((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Membership Form</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-2  gap-1 mt-4">
            <p className="text-[var(--primary)]">Membership Price :</p>
            <p>€{membershipAmount}</p>
          </div>
          <div className="grid grid-cols-2  gap-1 mt-4">
            <p className="text-[var(--primary)]">Popular Extra Donation :</p>
            <p>€{popularExtraDonation}</p>
          </div>
          <div className="grid grid-cols-2  gap-1 mt-4">
            <p className="text-[var(--primary)]">Para :</p>
            <p>{para}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-[var(--primary)]">Extra Donations :</p>
            <div className="flex flex-col gap-2">
              {extraDonation.map((item, index) => (
                <p className="text-lg" key={index}>
                  €{item}
                </p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-[var(--primary)]">Previous Party :</p>
            <div className="flex flex-col gap-2">
              {previousParty.map((item, index) => (
                <p className="text-lg" key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit form content</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Membership Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={membershipAmount}
                  onChange={(e) => setMembershipAmount(Number(e.target.value))}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={para}
                  onChange={(e) => setPara(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Popular Extra Donation <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={popularExtraDonation}
                  onChange={(e) =>
                    setPopularExtraDonation(Number(e.target.value))
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Extra Donation <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {extraDonation.map((item, index) => (
                    <input
                      key={index}
                      type="number"
                      className="w-full border rounded px-3 py-2"
                      value={item}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        setExtraDonation((prev) => {
                          const updated = [...prev];
                          updated[index] = newValue;
                          return updated;
                        });
                      }}
                      required
                      disabled={saving}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Previous Party <span className="text-red-500">*</span>
                </label>
                {previousParty?.map((point, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={point}
                      onChange={(e) =>
                        handleDropdownPointChange(idx, e.target.value)
                      }
                      required
                      disabled={savingDropdown}
                    />
                    {previousParty.length > 1 && (
                      <button
                        type="button"
                        className="text-red-500 font-bold"
                        onClick={() => handleRemoveDropdownPoint(idx)}
                        disabled={savingDropdown}
                        aria-label="Remove point"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={handleAddDropdownPoint}
                  disabled={savingDropdown}
                >
                  + Add Party
                </button>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipFormEdit;
