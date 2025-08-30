"use client";
import React, { useEffect, useState } from "react";
import Button from "./../common/button";
import Link from "next/link";
import Image from "next/image";
import EditButton from "../common/editButton";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function FooterEdit() {
  const [fbookLink, setFbookLink] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [YTLink, setYTLink] = useState("");
  const [XLink, setXLink] = useState("");
  const [LINLink, setLINLink] = useState("");
  const [TTLink, setTTLink] = useState("");
  const [copyright, setCopyright] = useState("");
  const [poweredText, setPoweredText] = useState("");
  const [pageLinks, setPageLinks] = useState([
    {
      name: "",
      url: "",
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getSectionData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "footer", "footerContent");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFbookLink(data.fbookLink || "");
          setInstaLink(data.instaLink || "");
          setYTLink(data.YTLink || "");
          setXLink(data.XLink || "");
          setLINLink(data.LINLink || "");
          setTTLink(data.TTLink || "");
          setCopyright(data.copyright || "");
          setPoweredText(data.poweredText || "");
          setPageLinks(data.pageLinks || []);
        } else {
          toast.error("No such document!");
        }
      } catch (error) {
        toast.error("Error fetching footer data");
        console.error("Error fetching footer data:", error);
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
      !fbookLink ||
      !instaLink ||
      !YTLink ||
      !XLink ||
      !LINLink ||
      !TTLink ||
      !copyright ||
      !poweredText ||
      pageLinks.some((link) => !link)
    ) {
      toast.error("All fields are required.");
      return;
    }
    setSaving(true);
    try {
      const docRef = doc(db, "footer", "footerContent");
      await updateDoc(docRef, {
        fbookLink: fbookLink.trim(),
        instaLink: instaLink.trim(),
        YTLink: YTLink.trim(),
        XLink: XLink.trim(),
        LINLink: LINLink.trim(),
        TTLink: TTLink.trim(),
        copyright: copyright.trim(),
        poweredText: poweredText.trim(),
        pageLinks: pageLinks.map((link) => ({
          name: link.name.trim(),
          url: link.url.trim(),
        })),
      });
      toast.success("Footer updated!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to update Footer.");
      console.error("Update error:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Footer Content</h2>
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
            <p className="text-[var(--primary)]">Facebook Link:</p>
            <p>{fbookLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Instagram Link:</p>
            <p>{instaLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Youtube Link:</p>
            <p>{YTLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">X(Twitter) Link:</p>
            <p>{XLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">LinkedIn Link:</p>
            <p>{LINLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">TikTok Link:</p>
            <p>{TTLink}</p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Copyright Text :</p>
            <p>{copyright}</p>
          </div>
          {pageLinks.map((link, index) => (
            <div className="grid grid-cols-2 mt-4" key={index}>
              <p className="text-[var(--primary)]">Page Link {index + 1}:</p>
              <p>{link.name}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 mt-4">
            <p className="text-[var(--primary)]">Powered Text</p>
            <p>{poweredText}</p>
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
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] relative max-h-[80vh] overflow-y-auto"
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
            <h3 className="text-xl font-semibold mb-4">Edit Footer</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Facebook Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={fbookLink}
                  onChange={(e) => setFbookLink(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Instagram Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={instaLink}
                  onChange={(e) => setInstaLink(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  YouTube Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={YTLink}
                  onChange={(e) => setYTLink(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  X Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={XLink}
                  onChange={(e) => setXLink(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  LinkedIn Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={LINLink}
                  onChange={(e) => setLINLink(e.target.value)}
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  TikTok Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={TTLink}
                  onChange={(e) => setTTLink(e.target.value)}
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
              {pageLinks.map((link, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">
                    Page Link {index + 1}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={link.name}
                    onChange={(e) => {
                      const newLinks = [...pageLinks];
                      newLinks[index].name = e.target.value;
                      setPageLinks(newLinks);
                    }}
                    required
                    disabled={saving}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Powered Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={poweredText}
                  onChange={(e) => setPoweredText(e.target.value)}
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

export default FooterEdit;
