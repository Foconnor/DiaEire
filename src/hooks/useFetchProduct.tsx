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
  where,
  CollectionReference,
  Query,
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

export function useFetchProducts(
  pageSize: number = 10,
  filterCategory: string | null = null,
  searchQuery: string = ""
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentFilter, setCurrentFilter] = useState<string | null>(
    filterCategory
  );
  const [currentSearch, setCurrentSearch] = useState<string>(searchQuery);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const allCategories = Array.from(
        new Set(snapshot.docs.map((doc) => (doc.data() as any).category))
      );
      setCategories(["All", ...allCategories]);
    } catch (err: any) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchTotalCount = async () => {
    try {
      let q: CollectionReference<DocumentData> | Query<DocumentData> =
        collection(db, "products");
      if (currentFilter && currentFilter !== "All") {
        q = query(q, where("category", "==", currentFilter));
      }
      const snapshot = await getCountFromServer(q as Query<DocumentData>);
      setTotalCount(snapshot.data().count);
    } catch (err: any) {
      console.error("Error fetching total count:", err);
    }
  };

  const fetchProductsPage = async (
    page: number = 1,
    filter: string | null = currentFilter,
    search: string = currentSearch
  ) => {
    setLoading(true);
    setError(null);

    try {
      const isFilterChanged =
        filter !== currentFilter || search !== currentSearch;

      if (isFilterChanged) {
        setLastDoc(null);
        setProducts([]);
        setCurrentFilter(filter);
        setCurrentSearch(search);
      }

      let q: Query<DocumentData> = collection(db, "products");

      if (filter && filter !== "All") {
        q = query(q, where("category", "==", filter));
      }

      if (search.trim()) {
        const lowerSearch = search.trim()
        q = query(
          q,
          where("name", ">=", lowerSearch),
          where("name", "<=", lowerSearch + "\uf8ff")
        );
      }

      q = query(q, orderBy("createdAt", "desc"), limit(pageSize));

      if (page > 1 && lastDoc && !isFilterChanged) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      }

      const snapshot = await getDocs(q);

      const list: Product[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, any>;
        return {
          id: doc.id,
          image: data.image || "",
          name: data.name || "",
          category: data.category || "",
          price: data.price || "",
          discountPrice: data.discountPrice || "",
          stock: data.stock || "",
          description: data.description || "",
        };
      });

      if (page > 1) {
        setProducts(list);
      } else {
        setProducts(list);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(list.length === pageSize);
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTotalCount();
    fetchProductsPage(1, currentFilter, currentSearch);
  }, [currentFilter, currentSearch]);

  return {
    products,
    categories,
    loading,
    error,
    fetchProductsPage,
    hasMore,
    totalCount,
  };
}
