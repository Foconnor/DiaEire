"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react";
import Pagination from "../common/pagination";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { useEditOrder } from "@/hooks/useEditOrder";
import { statusColors } from "@/lib/statusColors";
import { Product } from "@/types/types";
import { formatPrice } from "@/lib/formatPrice";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

function Orders() {
  const { orders, loading, totalCount, fetchOrdersPage } = useFetchOrders();
  const { products } = useFetchProducts();
  const { handleEdit } = useEditOrder();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDetailsModelOpen, setDetailsModelOpen] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);

  const status = [
    "All",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "refunded",
  ];

  // ---- Helper: Fetch product details ----
  const getProductDetails = async (ids: string[]) => {
    if (!ids || ids.length === 0) return [];
    const available = products.filter((p) => ids.includes(p.id));
    const missingIds = ids.filter((id) => !available.some((p) => p.id === id));

    if (missingIds.length === 0) return available;

    const q = query(collection(db, "products"), where("__name__", "in", missingIds));
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return [...available, ...fetched];
  };

  // ---- Fetch orders page ----
  useEffect(() => {
    fetchOrdersPage(currentPage, selectedStatus, searchQuery);
  }, [currentPage, selectedStatus, searchQuery]);

  // ---- Handle Edit Order ----
  const [formValue, setFormValue] = useState({ id: "", status: "" });

  const handleEditOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await handleEdit(formValue);
    await fetchOrdersPage();
    setSaving(false);
    setIsModalOpen(false);
  };

  // ---- Handle Details Modal ----
  const handleDetailsModelOpen = async (id: string) => {
    const filteredOrder = orders.find((item: any) => item.id === id);
    if (!filteredOrder) return;
    setOrder(filteredOrder);

    // Fetch related products
    const details = await getProductDetails(filteredOrder.productsIds || []);
    setProductsList(details);

    setDetailsModelOpen(true);
  };

  return (
    <div className="wrapper">
      <h1 className="mt-10 text-3xl text-center mb-10">Orders</h1>

      {/* Search + Filter */}
      <div className="!mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <input
          type="text"
          placeholder="Search orders"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[400px] border-b border-[var(--line)] h-10 px-2 text-sm outline-none text-gray-700"
        />
        <div className="relative w-full md:w-48">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border cursor-pointer border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm hover:bg-gray-50"
          >
            <span className="text-gray-700">{selectedStatus}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {open && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {status.map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setSelectedStatus(s);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    selectedStatus === s
                      ? "bg-gray-100 text-[var(--primary)] font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <Table>
        <TableCaption>
          <Pagination
            totalItems={totalCount}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{item.firstName} {item.lastName}</TableCell>
                <TableCell>
                  <span className="px-3 py-1 bg-green-400 capitalize rounded-full text-white">
                    {item.paymentStatus}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white capitalize ${statusColors[item.status]}`}
                  >
                    {item.status.replaceAll("_", " ")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setFormValue({ id: item.id, status: item.status });
                      }}
                      className="bg-[var(--primary)] text-white px-3 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> Update
                    </button>
                    <button
                      onClick={() => handleDetailsModelOpen(item.id)}
                      className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} /> View
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                {loading ? "Loading orders..." : "No orders found."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* --- Edit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-lg p-8 max-w-[400px] w-[90%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={saving}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Edit Order</h3>
            <form onSubmit={handleEditOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-2 py-3 border border-gray-300 rounded"
                  value={formValue.status}
                  onChange={(e) => setFormValue({ ...formValue, status: e.target.value })}
                >
                  {status.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[var(--primary)] text-white py-2 rounded hover:bg-[var(--btn-hover-bg)] transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Details Modal --- */}
      {isDetailsModelOpen && order && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setDetailsModelOpen(false)}>
          <div
            className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white max-w-[800px] w-[90%] max-h-[80vh] relative overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailsModelOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold cursor-pointer"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Order ID — {order.id}</h2>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.streetAddress}, {order.townCity}</p>
              <p><strong>Postcode:</strong> {order.postcode}</p>
              <p><strong>Country:</strong> {order.country}</p>
              <p>
                <strong>Payment:</strong>{" "}
                <span className="ml-2 bg-green-400 rounded-full px-3 py-1 text-white capitalize">
                  {order.paymentStatus}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-white capitalize ${statusColors[order.status]}`}
                >
                  {order.status.replaceAll("_", " ")}
                </span>
              </p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Ordered Products</h3>
              <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productsList?.length > 0 ? (
                  productsList.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-4 border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{p.name}</p>
                        <p className="text-[var(--primary)] font-semibold">
                          {formatPrice(Number(p.discountPrice))}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No product details found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
