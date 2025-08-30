"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EditButton from "../common/editButton";
import Link from "next/link";

function PreFooterEdit() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "preFooter"));
      const allData: any[] = [];
      querySnapshot.forEach((docSnap) => {
        allData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setCategories(allData);
    } catch (error) {
      toast.error("Error fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory({
      ...category,
      subCategories: category.subCategories || [],
    });
    setIsModalOpen(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory({ categoryName: "", links: [], subCategories: [] });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!saving && !deleting) setIsModalOpen(false);
  };

  // --- Main Links ---
  const handleLinkChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    if (!selectedCategory) return;
    const updatedLinks = [...selectedCategory.links];
    updatedLinks[index][field] = value;
    setSelectedCategory({ ...selectedCategory, links: updatedLinks });
  };

  const addLink = () => {
    if (!selectedCategory) return;
    setSelectedCategory({
      ...selectedCategory,
      links: [...(selectedCategory.links || []), { name: "", url: "" }],
    });
  };

  const removeLink = (index: number) => {
    if (!selectedCategory) return;
    setSelectedCategory({
      ...selectedCategory,
      links: selectedCategory.links.filter((_: any, i: number) => i !== index),
    });
  };

  // --- Subcategories ---
  const handleSubCategoryNameChange = (subIndex: number, value: string) => {
    const updated = [...selectedCategory.subCategories];
    updated[subIndex].subCategoryName = value;
    setSelectedCategory({ ...selectedCategory, subCategories: updated });
  };

  const addSubCategory = () => {
    setSelectedCategory({
      ...selectedCategory,
      subCategories: [
        ...(selectedCategory.subCategories || []),
        { subCategoryName: "", links: [] },
      ],
    });
  };

  const removeSubCategory = (subIndex: number) => {
    setSelectedCategory({
      ...selectedCategory,
      subCategories: selectedCategory.subCategories.filter(
        (_: any, i: number) => i !== subIndex
      ),
    });
  };

  // --- Links inside subcategories ---
  const handleSubLinkChange = (
    subIndex: number,
    linkIndex: number,
    field: "name" | "url",
    value: string
  ) => {
    const updated = [...selectedCategory.subCategories];
    updated[subIndex].links[linkIndex][field] = value;
    setSelectedCategory({ ...selectedCategory, subCategories: updated });
  };

  const addSubLink = (subIndex: number) => {
    const updated = [...selectedCategory.subCategories];
    updated[subIndex].links.push({ name: "", url: "" });
    setSelectedCategory({ ...selectedCategory, subCategories: updated });
  };

  const removeSubLink = (subIndex: number, linkIndex: number) => {
    const updated = [...selectedCategory.subCategories];
    updated[subIndex].links = updated[subIndex].links.filter(
      (_: any, i: number) => i !== linkIndex
    );
    setSelectedCategory({ ...selectedCategory, subCategories: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory?.categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setSaving(true);
    try {
      if (selectedCategory.id) {
        // Update existing category
        const docRef = doc(db, "preFooter", selectedCategory.id);
        await updateDoc(docRef, {
          categoryName: selectedCategory.categoryName.trim(),
          links: selectedCategory.links || [],
          subCategories: selectedCategory.subCategories || [],
        });
        toast.success("Category updated!");
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === selectedCategory.id ? selectedCategory : cat
          )
        );
      } else {
        // Add new category
        const docRef = await addDoc(collection(db, "preFooter"), {
          categoryName: selectedCategory.categoryName.trim(),
          links: selectedCategory.links || [],
          subCategories: selectedCategory.subCategories || [],
        });
        toast.success("Category added!");
        setCategories((prev) => [
          ...prev,
          { id: docRef.id, ...selectedCategory },
        ]);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory?.id) return;
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeleting(true);
    try {
      const docRef = doc(db, "preFooter", selectedCategory.id);
      await deleteDoc(docRef);
      toast.success("Category deleted!");
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== selectedCategory.id)
      );
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="wrapper !mt-10 p-5 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl">Pre Footer Content</h2>
        <button
          onClick={handleAddCategory}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition"
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="py-10 text-center">Loading...</p>
      ) : (
        <>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="mb-4 border-b pb-3 border-[var(--line)]"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{cat.categoryName}</h3>
                <EditButton onClick={() => handleEdit(cat)} />
              </div>

              {/* Main Links */}
              <ul className="list-disc list-inside mt-2">
                {cat.links?.map((link: any, i: number) => (
                  <li key={i}>
                    <strong>{link.name}</strong>
                    <Link
                      className="underline ms-4 text-[var(--primary)]"
                      href={link.url}
                    >
                      {link.url}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Subcategories */}
              {cat.subCategories?.map((sub: any, si: number) => (
                <div key={si} className="mt-3 pl-4 border-l-2 border-gray-200">
                  <h4 className="font-semibold">{sub.subCategoryName}</h4>
                  <ul className="list-disc list-inside mt-1">
                    {sub.links?.map((link: any, li: number) => (
                      <li key={li}>
                        <strong className="text-sm">{link.name}</strong>
                        <Link
                          className="underline ms-4 text-[var(--primary)]"
                          href={link.url}
                        >
                          {link.url}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedCategory && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[600px] w-[95%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              disabled={saving || deleting}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedCategory.id ? "Edit Category" : "Add Category"}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={selectedCategory.categoryName}
                  onChange={(e) =>
                    setSelectedCategory({
                      ...selectedCategory,
                      categoryName: e.target.value,
                    })
                  }
                  required
                  disabled={saving || deleting}
                />
              </div>

              {/* Links */}
              <div>
                <label className="block text-sm font-medium mb-2">Links</label>
                {selectedCategory.links?.map((link: any, index: number) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex-1 border rounded px-2 py-1"
                      value={link.name}
                      onChange={(e) =>
                        handleLinkChange(index, "name", e.target.value)
                      }
                      disabled={saving || deleting}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      className="flex-1 border rounded px-2 py-1"
                      value={link.url}
                      onChange={(e) =>
                        handleLinkChange(index, "url", e.target.value)
                      }
                      disabled={saving || deleting}
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-500 font-bold"
                      disabled={saving || deleting}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLink}
                  className="text-sm text-blue-500 mt-2"
                  disabled={saving || deleting}
                >
                  + Add Link
                </button>
              </div>

              {/* Subcategories */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategories
                </label>
                {selectedCategory.subCategories?.map((sub: any, si: number) => (
                  <div key={si} className="border p-3 mb-3 rounded bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Subcategory Name"
                        className="flex-1 border rounded px-2 py-1"
                        value={sub.subCategoryName}
                        onChange={(e) =>
                          handleSubCategoryNameChange(si, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeSubCategory(si)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </div>

                    {/* Subcategory Links */}
                    {sub.links?.map((sublink: any, li: number) => (
                      <div key={li} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Name"
                          className="flex-1 border rounded px-2 py-1"
                          value={sublink.name}
                          onChange={(e) =>
                            handleSubLinkChange(si, li, "name", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="URL"
                          className="flex-1 border rounded px-2 py-1"
                          value={sublink.url}
                          onChange={(e) =>
                            handleSubLinkChange(si, li, "url", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeSubLink(si, li)}
                          className="text-red-500 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addSubLink(si)}
                      className="text-sm text-blue-500"
                    >
                      + Add Sub Link
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubCategory}
                  className="text-sm text-green-600 mt-2"
                >
                  + Add Subcategory
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving || deleting}
                  className="flex-1 bg-[var(--primary)] text-white py-2 rounded font-semibold hover:bg-[var(--btn-hover-bg)] transition cursor-pointer disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : selectedCategory.id
                    ? "Save Changes"
                    : "Create Category"}
                </button>

                {selectedCategory.id && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving || deleting}
                    className="flex-1 bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition cursor-pointer disabled:opacity-60"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreFooterEdit;
