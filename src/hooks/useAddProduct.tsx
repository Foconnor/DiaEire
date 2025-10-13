import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/../firebase/firebaseConfig";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAdd = async (formValue: {
    name: string;
    price: number;
    description: string;
    image?: string;
    category?: string;
    stock?: number;
    discountPrice?: number;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!formValue.name || !formValue.price) {
        throw new Error("Name and price are required.");
      }

      const newProduct = {
        name: formValue.name.trim(),
        price: Number(formValue.price),
        description: formValue.description?.trim() || "",
        image: formValue.image || null,
        category: formValue.category || "Uncategorized",
        stock: Number(formValue.stock) || 0,
        discountPrice: Number(formValue.discountPrice),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "products"), newProduct);

      toast.success("Product added successfully.");
      setSuccess(true);
      return docRef.id;
    } catch (err: any) {
      toast.error("Failed to add product. Please try again later.");
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleAdd, loading, error, success };
}
