"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { faClose, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react";
import Pagination from "../common/pagination";
import { useFetchOrders } from "@/hooks/useFetchOrders";
import { useEditOrder } from "@/hooks/useEditOrder";
import { statusColors } from "@/lib/statusColors";

function Orders() {
  const { orders, error, loading, totalCount, fetchOrdersPage } =
    useFetchOrders();
  const { handleEdit } = useEditOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const status = [
    "All",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "refunded",
  ];

  const handleOpenModel = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [formValue, setFormValue] = React.useState({
    id: "",
    status: "",
  });

  const handleEditOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await handleEdit(formValue);

    fetchOrdersPage();

    setSaving(false);
    closeModal();
  };

  useEffect(() => {
    const fetchPage = async () => {
      await fetchOrdersPage(currentPage, selectedStatus, searchQuery);
    };

    fetchPage();
  }, [currentPage, selectedStatus, searchQuery]);

  return (
    <div className="wrapper">
      <h1 className="mt-10 text-3xl text-center mb-10">Orders</h1>
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
            <ul className="absolute z-10 mt-1 w-full bg-white border bg-in border-gray-200 rounded-md shadow-lg">
              {status.map((status) => (
                <li
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    selectedStatus === status
                      ? "bg-gray-100 text-[var(--primary)] font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="">
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
              <TableHead className="text-start">Date</TableHead>
              <TableHead className="text-start">Name</TableHead>
              <TableHead className="text-start">Email</TableHead>
              <TableHead className="text-start">Payment Status</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-start">Phone</TableHead>
              <TableHead className="text-start">Postal Code</TableHead>
              <TableHead className="text-start ">Street Address</TableHead>
              <TableHead className="text-start">Town City</TableHead>
              <TableHead className="text-start">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-start">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-start max-w-[200px] truncate">
                    {item.firstName} {item.lastName}
                  </TableCell>
                  <TableCell className="text-start max-w-[200px] truncate">
                    {item.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="px-3 py-1 bg-green-400 capitalize rounded-full text-white">
                      {item.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-3 py-1 ${
                        statusColors[item.status]
                      } rounded-full text-white capitalize`}
                    >
                      {item.status.replaceAll("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-start">{item.phone}</TableCell>
                  <TableCell className="text-start">{item.postcode}</TableCell>
                  <TableCell className="text-start max-w-[200px] truncate ">
                    {item.streetAddress}
                  </TableCell>
                  <TableCell className="text-start">{item.townCity}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenModel();
                          setIsEditing(true);
                          setFormValue({
                            id: item.id,
                            status: item.status,
                          });
                        }}
                        className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-500 py-10"
                >
                  {loading ? "Loading orders..." : "No orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 max-w-[400px] w-[90%] max-h-[80vh] relative overflow-auto"
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
            <h3 className="text-xl font-semibold mb-4">{"Edit Order"}</h3>
            <form className="space-y-4" onSubmit={handleEditOrder}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-2 py-3 border border-[var(--line)] outline-1 outline-[var(--primary)]"
                  value={formValue.status}
                  onChange={(e) => {
                    setFormValue((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }));
                  }}
                >
                  {status.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
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

export default Orders;
