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
import { Order } from "@/types/types";

export function useFetchOrders(
  pageSize: number = 9,
  filterStatus: string | null = null,
  searchQuery: string = ""
) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentFilter, setCurrentFilter] = useState<string | null>(
    filterStatus
  );
  const [currentSearch, setCurrentSearch] = useState<string>(searchQuery);

  const fetchTotalCount = async () => {
    try {
      let q: CollectionReference<DocumentData> | Query<DocumentData> =
        collection(db, "orders");
      if (currentFilter && currentFilter !== "All") {
        q = query(q, where("status", "==", currentFilter));
      }
      const snapshot = await getCountFromServer(q as Query<DocumentData>);
      setTotalCount(snapshot.data().count);
    } catch (err: any) {
      console.error("Error fetching total count:", err);
    }
  };

  const fetchOrdersPage = async (
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
        setOrders([]);
        setCurrentFilter(filter);
        setCurrentSearch(search);
      }

      let q: Query<DocumentData> = collection(db, "orders");

      if (filter && filter !== "All") {
        q = query(q, where("category", "==", filter));
      }

      if (search.trim()) {
        const lowerSearch = search.trim().toLowerCase();
        q = query(
          q,
          where("nameLowerCase", ">=", lowerSearch),
          where("nameLowerCase", "<=", lowerSearch + "\uf8ff")
        );
      }

      q = query(q, orderBy("createdAt", "desc"), limit(pageSize));

      if (page > 1 && lastDoc && !isFilterChanged) {
        q = query(q, startAfter(lastDoc), limit(pageSize));
      }

      const snapshot = await getDocs(q);

      const list: Order[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Record<string, any>;
        return {
          id: doc.id,
          country: data.country || "",
          createdAt: data.createdAt || "",
          email: data.email || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          orderNotes: data.orderNotes || "",
          phone: data.phone || "",
          postcode: data.postcode || "",
          productsIds: data.productsIds || [],
          paymentStatus: data.paymentStatus || "",
          streetAddress: data.streetAddress || "",
          townCity: data.townCity || "",
          status: data.status || "",
        };
      });

      if (page > 1) {
        setOrders(list);
      } else {
        setOrders(list);
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
    fetchTotalCount();
    fetchOrdersPage(1, currentFilter, currentSearch);
  }, [currentFilter, currentSearch]);

  return {
    orders,
    loading,
    error,
    fetchOrdersPage,
    hasMore,
    totalCount,
  };
}
