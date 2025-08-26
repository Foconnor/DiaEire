"use client";
import React, { useEffect, useState } from "react";
import EditButton from "../common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function DonationEdit() {
  const [title, setTitle] = useState("Loading...");
  const [img, setImg] = useState("Loading...");
  const [copyright, setCopyright] = useState("Loading...");
  const [donationTitle, setDonationTitle] = useState("Loading...");
  const [donationType, setDonationType] = useState("Loading...");
  const [popupQuestion, setPopupQuestion] = useState("Loading...");
  const [popupAnswer, setPopupAnswer] = useState("Loading...");
  const [paraOne, setParaOne] = useState("Loading...");
  const [paraTwo, setParaTwo] = useState("Loading...");

  const [donationAmounts, setDonationAmounts] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSectionData = async () => {
      try {
        const docRef = doc(db, "donation", "donationPage");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "Loading...");
          setImg(data.img || "Loading...");
          setCopyright(data.copyright);
          setDonationTitle(data.donationTitle || "Loading...");
          setDonationType(data.donationType || "Loading...");
          setDonationAmounts(data.donationAmounts || "Loading...");
          setPopupQuestion(data.popupQuestion || "Loading...");
          setPopupAnswer(data.popupAwnser || "Loading...");
          setParaOne(data.paraOne || "Loading...");
          setParaTwo(data.paraTwo || "Loading...");
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching donation page data");
        console.error("Error fetching donaiton page data:", error);
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
      !copyright.trim() ||
      !donationTitle.trim() ||
      !donationType.trim() ||
      !donationAmounts.length ||
      !popupQuestion.trim() ||
      !popupAnswer.trim() ||
      !paraOne.trim() ||
      !paraTwo.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "donation", "donationPage");
      await updateDoc(docRef, {
        title: title.trim(),
        img: img.trim(),
        copyright: copyright.trim(),
        donationTitle: donationTitle.trim(),
        donationType: donationType.trim(),
        donationAmounts: donationAmounts,
        popupQuestion: popupQuestion.trim(),
        popupAnswer: popupAnswer.trim(),
        paraOne: paraOne.trim(),
        paraTwo: paraTwo.trim(),
      });
      toast.success("donation Page updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update donation page.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Donation Page</h2>
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
            <p className="text-[var(--primary)]">Copyright Text :</p>
            <p>{copyright}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Donation Title</p>
            <p>{donationTitle}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Donation Type</p>
            <p>{donationType}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Popup Question</p>
            <p>{popupQuestion}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Popup Awnser</p>
            <p>{popupAnswer}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para One</p>
            <p>{paraOne}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Para Two</p>
            <p>{paraTwo}</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4">
            <p className="text-[var(--primary)]">Donations Amounts :</p>
            <div className="flex flex-col gap-2">
              {donationAmounts.map((item, index) => (
                <p className="text-lg" key={index}>
                  €{item}
                </p>
              ))}
            </div>
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
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] max-h-[80vh] relative overflow-auto"
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
                  Copyright Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={copyright}
                  onChange={(e) => setCopyright(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Donation Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={donationTitle}
                  onChange={(e) => setDonationTitle(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Donation Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Popup Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={popupQuestion}
                  onChange={(e) => setPopupQuestion(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Popup Awnser <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={popupAnswer}
                  onChange={(e) => setPopupAnswer(e.target.value)}
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
                  Donation Amounts <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {donationAmounts.map((item, index) => (
                    <input
                      key={index}
                      type="number"
                      className="w-full border rounded px-3 py-2"
                      value={item}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        setDonationAmounts((prev) => {
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

export default DonationEdit;
