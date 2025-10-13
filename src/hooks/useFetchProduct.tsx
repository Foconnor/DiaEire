import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  getCountFromServer,
} from "firebase/firestore";
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

export function useFetchProducts(pageSize: number = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchTotalCount = async () => {
    try {
      const snapshot = await getCountFromServer(collection(db, "products"));
      setTotalCount(snapshot.data().count);
    } catch (err: any) {
      console.error("Error fetching total count:", err);
    }
  };

  const fetchProductsPage = async (page: number = 1) => {
    setLoading(true);
    try {
      let q;
      const skip = (page - 1) * pageSize;

      if (page === 1) {
        q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(pageSize));
      } else {
        if (!lastDoc) {
          const prevSnapshot = await getDocs(
            query(collection(db, "products"), orderBy("createdAt", "desc"), limit(skip))
          );
          setLastDoc(prevSnapshot.docs[prevSnapshot.docs.length - 1]);
        }
        q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc!),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);
      const list: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(list);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(list.length === pageSize);
      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount();
    fetchProductsPage(1);
  }, []);

  return { products, loading, error, fetchProductsPage, hasMore, totalCount };
}
