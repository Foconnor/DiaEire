"use client";
import EditButton from "@/components/common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../../firebase/firebaseConfig";

function FundEdit() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState("");
  const [tagline, setTagline] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageFund");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setButtonText(data.buttonText || "");
          setImage(data.image || "");
          setTagline(data.tagline || "");
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
    if (
      !title.trim() ||
      !buttonText.trim() ||
      !image.trim() ||
      !tagline.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "landingPage", "landingPageFund");
      await updateDoc(docRef, {
        heroTitle: title.trim(),
        buttonText: buttonText.trim(),
        image: image.trim(),
        tagline: tagline.trim(),
      });
      toast.success("Section updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update section.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Third Section</h2>
        <EditButton onClick={handleEdit} />
      </div>
      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          <div className="flex items-center gap-1 mt-4">
            <p className="text-[var(--primary)]">Title :</p>
            <p>{title}</p>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <p className="text-[var(--primary)]">Tagline :</p>
            <p>{tagline}</p>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <p className="text-[var(--primary)]">Button Text :</p>
            <p>{buttonText}</p>
          </div>
          <div className="flex items-start gap-1 mt-4">
            <p className="text-[var(--primary)]">Background Image :</p>
            <img
              src={image}
              alt="fund background"
              width={200}
              height={120}
              className="rounded shadow"
            />
          </div>
        </>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8  max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Fund Section</h3>
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
                  Tagline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
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
                  Image URL <span className="text-red-500">*</span>
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
    </div>
  );
}

export default FundEdit;
