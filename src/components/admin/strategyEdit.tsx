"use client";
import React, { useEffect, useState } from "react";
import EditButton from "../common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function StrategyEdit() {
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");
  const [paraThree, setParaThree] = useState("Loading...");
  const [paraFour, setParaFour] = useState("Loading...");
  const [paraFive, setParaFive] = useState("Loading...");
  const [hTextOne, setHTextOne] = useState("Loading...");
  const [hTextTwo, setHTextTwo] = useState("Loading...");
  const [hTextThree, setHTextThree] = useState("Loading...");
  const [hTextFour, setHTextFour] = useState("Loading...");
  const [hTextFive, setHTextFive] = useState("Loading...");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "strategy", "strategyPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading");
          setImg(data.img || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
          setParaThree(data.paraThree || "Loading...");
          setParaFour(data.paraFour || "Loading...");
          setParaFive(data.paraFive || "Loading...");
          setHTextOne(data.hTextOne || "Loading...");
          setHTextTwo(data.hTextTwo || "Loading...");
          setHTextThree(data.hTextThree || "Loading...");
          setHTextFour(data.hTextFour || "Loading...");
          setHTextFive(data.hTextFive || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching strategy page data");
        console.error("Error fetching strategy page data:", error);
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
      !paraThree.trim() ||
      !paraFour.trim() ||
      !paraFive.trim() ||
      !hTextOne.trim() ||
      !hTextTwo.trim() ||
      !hTextThree.trim() ||
      !hTextFour.trim() ||
      !hTextFive.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "strategy", "strategyPage");
      await updateDoc(docRef, {
        title: title.trim(),
        img: img.trim(),
        paraOne: paraOne.trim(),
        paraTwo: paraTwo.trim(),
        paraThree: paraThree.trim(),
        paraFour: paraFour.trim(),
        paraFive: paraFive.trim(),
        hTextOne: hTextOne.trim(),
        hTextTwo: hTextTwo.trim(),
        hTextThree: hTextThree.trim(),
        hTextFour: hTextFour.trim(),
        hTextFive: hTextFive.trim(),
      });
      toast.success("Vision Page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update strategy page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Strategy Page</h2>
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
            <p className="text-[var(--primary)]">Para Three :</p>
            <p>{paraThree}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Hightlighted Text One :</p>
            <p>{hTextOne}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Hightlighted Text Two :</p>
            <p>{hTextTwo}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Hightlighted Text Three :</p>
            <p>{hTextThree}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Hightlighted Text Four :</p>
            <p>{hTextFour}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Hightlighted Text Five :</p>
            <p>{hTextFive}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para Four :</p>
            <p>{paraFour}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para Five :</p>
            <p>{paraFive}</p>
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
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative h-[90vh] overflow-auto"
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
            <h3 className="text-xl font-semibold mb-4">Edit Vision Page</h3>
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
                  Para Three <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={paraThree}
                  onChange={(e) => setParaThree(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hightlighted Text One <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={hTextOne}
                  onChange={(e) => setHTextOne(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hightlighted Text Two <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={hTextTwo}
                  onChange={(e) => setHTextTwo(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hightlighted Text Three{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={hTextThree}
                  onChange={(e) => setHTextThree(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hightlighted Text Four <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={hTextFour}
                  onChange={(e) => setHTextFour(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hightlighted Text Five <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={hTextFive}
                  onChange={(e) => setHTextFive(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para Four <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={paraFour}
                  onChange={(e) => setParaFour(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Para Five <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={paraFive}
                  onChange={(e) => setParaFive(e.target.value)}
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

export default StrategyEdit;
