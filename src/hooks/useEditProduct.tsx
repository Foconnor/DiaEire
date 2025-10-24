import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebase/firebaseConfig";
import toast from "react-hot-toast";

interface ProductFormValue {
  id: string; 
  image: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  weight:number;
  description: string;
}

export function useEditProduct() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (formValue: ProductFormValue) => {
    setSuccess(false);
    setError(null);

    try {
      const productRef = doc(db, "products", formValue.id);

      // Only update fields we want
      await updateDoc(productRef, {
        name: formValue.name,
        category: formValue.category,
        price: formValue.price,
        discountPrice: formValue.discountPrice,
        stock: formValue.stock,
        image: formValue.image,
        weight: formValue.weight,
        description: formValue.description,
      });

      toast.success("Product updated successfully.");
      setSuccess(true);
      return true;
    } catch (err: any) {
      toast.error("Failed to update product. Please try again later.");
      setError(err.message || "Failed to update product");
      return false;
    }
  };

  return { handleEdit, success, error };
}
