"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import EditButton from "../common/editButton";
import Image from "next/image";

interface Dropdown {
  id: string;
  title: string;
  points: { text: string }[];
}

function MembershipEdit() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [pointOne, setPointOne] = useState("");
  const [pointTwo, setPointTwo] = useState("");
  const [pointThree, setPointThree] = useState("");
  const [paraOne, setParaOne] = useState("");
  const [paraTwo, setParaTwo] = useState("");
  const [name, setName] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState("");
  const [dropdowns, setDropdowns] = useState<Dropdown[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  // Dropdown modal state
  const [isDropdownModalOpen, setIsDropdownModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<Dropdown | null>(null);
  const [dropdownForm, setDropdownForm] = useState<{
    title: string;
    points: string[];
  }>({
    title: "",
    points: [""],
  });
  const [savingDropdown, setSavingDropdown] = useState(false);

  // Fetch main section data
  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "membershipPage", "membershipPageContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setImage(data.image || "");
          setTitle(data.title || "");
          setSubTitle(data.subTitle || "");
          setPointOne(data.pointOne || "");
          setPointTwo(data.pointTwo || "");
          setPointThree(data.pointThree || "");
          setParaOne(data.paraOne || "");
          setParaTwo(data.paraTwo || "");
          setName(data.name || "");
          setButtonText(data.buttonText || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching membership page data");
        console.error("Error fetching membership page data:", error);
      } finally {
        setLoading(false);
      }
    };
    getSectionData();
  }, []);

  // Fetch dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      setDropdownLoading(true);
      try {
        const dropdownColRef = collection(
          db,
          "membershipPage",
          "membershipPageContent",
          "Dropdown"
        );
        const querySnapshot = await getDocs(dropdownColRef);
        const dropdownArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { title: string; points: { text: string }[] }),
        }));
        setDropdowns(dropdownArr);
      } catch (error) {
        toast.error("Error fetching dropdowns");
        console.error("Error fetching dropdowns:", error);
      } finally {
        setDropdownLoading(false);
      }
    };
    fetchDropdowns();
  }, []);

  // Main section edit
  function handleEdit() {
    setIsModalOpen(true);
  }
  function closeModal() {
    if (!saving) setIsModalOpen(false);
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !title.trim() ||
      !subTitle.trim() ||
      !pointOne.trim() ||
      !pointTwo.trim() ||
      !pointThree.trim() ||
      !paraOne.trim() ||
      !paraTwo.trim() ||
      !name.trim() ||
      !buttonText.trim() ||
      !image.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "membershipPage", "membershipPageContent");
      await updateDoc(docRef, {
        title: title.trim(),
        subTitle: subTitle.trim(),
        pointOne: pointOne.trim(),
        pointTwo: pointTwo.trim(),
        pointThree: pointThree.trim(),
        paraOne: paraOne.trim(),
        paraTwo: paraTwo.trim(),
        name: name.trim(),
        buttonText: buttonText.trim(),
        image: image.trim(),
      });
      toast.success("Membership page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update membership page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  // Dropdown edit
  function handleEditDropdown(dropdown: Dropdown) {
    setActiveDropdown(dropdown);
    setDropdownForm({
      title: dropdown.title,
      points: (dropdown.points ?? []).map((p) => p.text),
    });
    setIsDropdownModalOpen(true);
  }
  function closeDropdownModal() {
    if (!savingDropdown) setIsDropdownModalOpen(false);
  }
  function handleDropdownPointChange(idx: number, value: string) {
    setDropdownForm((prev) => {
      const points = [...prev.points];
      points[idx] = value;
      return { ...prev, points };
    });
  }
  function handleAddDropdownPoint() {
    setDropdownForm((prev) => ({ ...prev, points: [...prev.points, ""] }));
  }
  function handleRemoveDropdownPoint(idx: number) {
    setDropdownForm((prev) => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== idx),
    }));
  }
  async function handleDropdownSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !dropdownForm.title.trim() ||
      dropdownForm.points.some((p) => !p.trim())
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSavingDropdown(true);
    try {
      if (activeDropdown) {
        const dropdownDocRef = doc(
          db,
          "membershipPage",
          "membershipPageContent",
          "Dropdown",
          activeDropdown.id
        );
        await updateDoc(dropdownDocRef, {
          title: dropdownForm.title.trim(),
          points: dropdownForm.points.map((text) => ({ text: text.trim() })),
        });
        toast.success("Dropdown updated!");
        setIsDropdownModalOpen(false);
        // Refresh dropdowns
        const dropdownColRef = collection(
          db,
          "membershipPage",
          "membershipPageContent",
          "Dropdown"
        );
        const querySnapshot = await getDocs(dropdownColRef);
        const dropdownArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { title: string; points: { text: string }[] }),
        }));
        setDropdowns(dropdownArr);
      }
    } catch (error) {
      toast.error("Failed to update dropdown.");
      console.error("Update error:", error);
    } finally {
      setSavingDropdown(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">What Is Membership Page</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10">
          <div className="h-6 text-center rounded mb-4 animate-pulse">
            Loading...
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Title :</p>
            <p>{title}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Sub Title :</p>
            <p>{subTitle}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Point One :</p>
            <p>{pointOne}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Point Two :</p>
            <p>{pointTwo}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Point Three :</p>
            <p>{pointThree}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para One :</p>
            <p>{paraOne}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para Two :</p>
            <p>{paraTwo}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Name :</p>
            <p>{name}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Button Text :</p>
            <p>{buttonText}</p>
          </div>
          <div className="flex items-start justify-between gap-1 mt-4">
            <p className="text-[var(--primary)]">Background Image :</p>
            <img
              src={image || "/placeholder.png"}
              alt="background"
              width={200}
              height={120}
              className="rounded shadow"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Dropdowns</h3>
            {dropdownLoading ? (
              <div className="py-4 text-gray-400">Loading dropdowns...</div>
            ) : (
              dropdowns?.map((dropdown) => (
                <div key={dropdown.id} className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{dropdown.title}</span>
                    <EditButton onClick={() => handleEditDropdown(dropdown)} />
                  </div>
                  <ul className="list-disc ml-6 mt-2">
                    {(dropdown.points ?? []).map((p, i) => (
                      <li key={i}>{p.text}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Main Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] max-h-[90%] w-[90%] relative overflow-y-scroll"
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
            <h3 className="text-xl font-semibold mb-4">Edit Membership Page</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sub Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Point One <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={pointOne}
                  onChange={(e) => setPointOne(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Point Two <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={pointTwo}
                  onChange={(e) => setPointTwo(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Point Three <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={pointThree}
                  onChange={(e) => setPointThree(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para One <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={paraOne}
                  onChange={(e) => setParaOne(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para Two <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={paraTwo}
                  onChange={(e) => setParaTwo(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Button Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Background Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  disabled={saving}
                />
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

      {/* Dropdown Edit Modal */}
      {isDropdownModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeDropdownModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDropdownModal}
              disabled={savingDropdown}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Dropdown</h3>
            <form className="space-y-4" onSubmit={handleDropdownSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dropdown Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={dropdownForm.title}
                  onChange={(e) =>
                    setDropdownForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  disabled={savingDropdown}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Points <span className="text-red-500">*</span>
                </label>
                {dropdownForm?.points.map((point, idx) => (
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
                    {dropdownForm.points.length > 1 && (
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
                  + Add Point
                </button>
              </div>
              <button
                type="submit"
                disabled={savingDropdown}
                className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
              >
                {savingDropdown ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipEdit;
