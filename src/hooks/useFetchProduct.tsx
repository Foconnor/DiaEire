import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/../firebase/firebaseConfig";

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: string;
  discountPrice: string;
  stock: string;
  description: string;
}

export function useFetchProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: Product[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];

          setProducts(list);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching products:", err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { products, loading, error };
}
