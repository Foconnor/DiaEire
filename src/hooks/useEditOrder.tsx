import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebase/firebaseConfig";
import toast from "react-hot-toast";

interface orderEdit {
  id: string;
  status: string;
}

export function useEditOrder() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (formValue: orderEdit) => {
    setSuccess(false);
    setError(null);

    try {
      const productRef = doc(db, "orders", formValue.id);

      await updateDoc(productRef, {
        status: formValue.status,
      });

      toast.success("Order updated successfully.");
      setSuccess(true);
      return true;
    } catch (err: any) {
      toast.error("Failed to update order. Please try again later.");
      setError(err.message || "Failed to update order");
      return false;
    }
  };

  return { handleEdit, success, error };
}
