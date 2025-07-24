"use client";
import { useEffect, useState } from "react";
import EditButton from "@/components/common/editButton";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

interface Slider {
  id: string;
  key: string;
  title: string;
  des: string;
  buttonText: string;
  image: string;
}

function LabourEdit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSliderModalOpen, setIsSliderModalOpen] = useState(false);
  const [activeSliderId, setActiveSliderId] = useState<string | null>(null);

  const [sectionTitle, setSectionTitle] = useState("");
  const [savingTitle, setSavingTitle] = useState(false);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState<Slider[]>([]);
  const [sliderForm, setSliderForm] = useState({
    key: "",
    title: "",
    des: "",
    buttonText: "",
    image: "",
  });
  const [savingSlider, setSavingSlider] = useState(false);

  // Fetch section title
  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "landingPage", "landingPageLabour");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSectionTitle(data.sectionTitle || "");
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

  // Fetch slider documents
  useEffect(() => {
    const getSliders = async () => {
      setLoading(true);
      try {
        const sliderColRef = collection(
          db,
          "landingPage",
          "landingPageLabour",
          "slider"
        );
        const querySnapshot = await getDocs(sliderColRef);
        const slidersArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Slider[];
        setItems(slidersArr);
      } catch (error) {
        toast.error("Error fetching sliders");
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };
    getSliders();
  }, []);

  // Edit section title
  function handleEditTitle() {
    setIsModalOpen(true);
  }
  function closeTitleModal() {
    if (!savingTitle) setIsModalOpen(false);
  }
  async function handleTitleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sectionTitle.trim()) {
      toast.error("Title is required.");
      return;
    }
    setSavingTitle(true);
    try {
      const docRef = doc(db, "landingPage", "landingPageLabour");
      await updateDoc(docRef, { sectionTitle: sectionTitle.trim() });
      toast.success("Section title updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update section title.");
      console.error("Update error:", error);
    } finally {
      setSavingTitle(false);
    }
  }

  // Edit slider
  function handleEditSlider(slider: Slider) {
    setActiveSliderId(slider.id);
    setSliderForm({
      key: slider.key,
      title: slider.title,
      des: slider.des,
      buttonText: slider.buttonText,
      image: slider.image,
    });
    setIsSliderModalOpen(true);
  }
  function closeSliderModal() {
    if (!savingSlider) setIsSliderModalOpen(false);
  }
  async function handleSliderSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { key, title, des, buttonText, image } = sliderForm;
    if (!title.trim() || !des.trim() || !buttonText.trim() || !image.trim()) {
      toast.error("All fields are required.");
      return;
    }
    setSavingSlider(true);
    try {
      if (activeSliderId) {
        const sliderDocRef = doc(
          db,
          "landingPage",
          "landingPageLabour",
          "slider",
          activeSliderId
        );
        await updateDoc(sliderDocRef, {
          keys: key.trim(),
          title: title.trim(),
          des: des.trim(),
          buttonText: buttonText.trim(),
          image: image.trim(),
        });
        toast.success("Slider updated!");
        setIsSliderModalOpen(false);
        // Refresh sliders
        const sliderColRef = collection(
          db,
          "landingPage",
          "landingPageLabour",
          "slider"
        );
        const querySnapshot = await getDocs(sliderColRef);
        const slidersArr = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Slider[];
        setItems(slidersArr);
      }
    } catch (error) {
      toast.error("Failed to update slider.");
      console.error("Update error:", error);
    } finally {
      setSavingSlider(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Second Section</h2>
        <EditButton onClick={handleEditTitle} />
      </div>
      <div className="grid grid-cols-2 mt-4">
        <p className="text-[var(--primary)]">Second Section Title :</p>
        <p>
          {loading ? (
            <span className="py-10 text-center text-gray-400">Loading...</span>
          ) : (
            sectionTitle
          )}
        </p>
      </div>

      {items?.map((item) => (
        <div
          key={item.id}
          className="border-t-[1px] border-[var(--line)] pb-4 mt-4"
        >
          <div className="flex items-center justify-between my-4">
            <h2 className="text-lg mt-2">Slider</h2>
            <EditButton onClick={() => handleEditSlider(item)} />
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)] whitespace-nowrap">
              Slider Key :
            </p>
            <p>{item.key}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Title :</p>
            <p>{item.title}</p>
          </div>
          <div className="grid grid-cols-2  mt-4">
            <p className="text-[var(--primary)] whitespace-nowrap">
              Slider para :
            </p>
            <p className="wrap-break-word">{item.des}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Button :</p>
            <p>{item.buttonText}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Slider Image :</p>
            <img src={item.image} alt="slider image" width={200} height={200} />
          </div>
        </div>
      ))}

      {/* Section Title Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeTitleModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeTitleModal}
              disabled={savingTitle}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Section Title</h3>
            <form className="space-y-4" onSubmit={handleTitleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Section Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  required
                  disabled={savingTitle}
                />
              </div>
              <button
                type="submit"
                disabled={savingTitle}
                className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
              >
                {savingTitle ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slider Modal */}
      {isSliderModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeSliderModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSliderModal}
              disabled={savingSlider}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Slider</h3>
            <form className="space-y-4" onSubmit={handleSliderSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={sliderForm.key}
                  onChange={(e) =>
                    setSliderForm({ ...sliderForm, key: e.target.value })
                  }
                  required
                  disabled={savingSlider}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={sliderForm.title}
                  onChange={(e) =>
                    setSliderForm({ ...sliderForm, title: e.target.value })
                  }
                  required
                  disabled={savingSlider}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  value={sliderForm.des}
                  onChange={(e) =>
                    setSliderForm({ ...sliderForm, des: e.target.value })
                  }
                  required
                  disabled={savingSlider}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Button Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={sliderForm.buttonText}
                  onChange={(e) =>
                    setSliderForm({ ...sliderForm, buttonText: e.target.value })
                  }
                  required
                  disabled={savingSlider}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={sliderForm.image}
                  onChange={(e) =>
                    setSliderForm({ ...sliderForm, image: e.target.value })
                  }
                  required
                  disabled={savingSlider}
                />
              </div>
              <button
                type="submit"
                disabled={savingSlider}
                className="w-full bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
              >
                {savingSlider ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LabourEdit;
