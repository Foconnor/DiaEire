"use client";
import React, { useEffect, useState } from "react";
import EditButton from "../common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function SignupEdit() {
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [formDes, setFormDes] = useState("Loading...");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "signup", "signupPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading");
          setImg(data.img || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
          setFormDes(data.formDes || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching signup page data");
        console.error("Error fetching signup page data:", error);
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
      !img.trim() ||
      !paraOne.trim() ||
      !paraTwo.trim() ||
      !formDes.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "signup", "signupPage");
      await updateDoc(docRef, {
        title: title.trim(),
        img: img.trim(),
        paraOne: paraOne.trim(),
        paraTwo: paraTwo.trim(),
        formDes: formDes.trim(),
      });
      toast.success("signup Page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update signup page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Signup Page</h2>
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
            <p className="text-[var(--primary)]">Para One :</p>
            <p>{paraOne}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para Two :</p>
            <p>{paraTwo}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Form Des :</p>
            <p>{formDes}</p>
          </div>
          <div className="flex items-start justify-between gap-1 mt-4">
            <p className="text-[var(--primary)]">Img :</p>
            <img
              src={img}
              alt="logo"
              width={200}
              height={120}
              className="rounded shadow"
            />
          </div>
        </>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative overflow-auto"
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
            <h3 className="text-xl font-semibold mb-4">Edit Signup Page</h3>
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
                  Img URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para One <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
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
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={paraTwo}
                  onChange={(e) => setParaTwo(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Form Des <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formDes}
                  onChange={(e) => setFormDes(e.target.value)}
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

export default SignupEdit;
