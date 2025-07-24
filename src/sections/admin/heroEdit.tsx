"use client";
import EditButton from "@/components/common/editButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";

function HeroEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageHero");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroTitle(data.heroTitle || "");
          setHeroButtonText(data.buttonText || "");
          setHeroImage(data.backgroundImage || "");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching section data");
        console.error("Error fetching section data:", error);
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
    if (!heroTitle.trim() || !heroButtonText.trim() || !heroImage.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "landingPage", "landingPageHero");
      await updateDoc(docRef, {
        heroTitle: heroTitle.trim(),
        buttonText: heroButtonText.trim(),
        backgroundImage: heroImage.trim(),
      });
      toast.success("Hero section updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update hero section.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Hero Section</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="flex items-center gap-1 mt-4">
            <p className="text-[var(--primary)]">Hero Title :</p>
            <p>{heroTitle}</p>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <p className="text-[var(--primary)]">Button Text :</p>
            <p>{heroButtonText}</p>
          </div>
          <div className="flex items-start justify-between gap-1 mt-4">
            <p className="text-[var(--primary)]">Background Image :</p>
            {heroImage ? (
              <img
                src={heroImage}
                alt="hero background image"
                width={200}
                height={200}
                className="rounded shadow"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )}
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
            <h3 className="text-xl font-semibold mb-4">Edit Hero Section</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hero Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
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
                  value={heroButtonText}
                  onChange={(e) => setHeroButtonText(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
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
    </div>
  );
}

export default HeroEdit;
