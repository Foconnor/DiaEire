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
import {
  faClose,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronDown } from "lucide-react";
import Pagination from "../common/pagination";
import { useAddProduct } from "@/hooks/useAddProduct";
import { useFetchProducts } from "@/hooks/useFetchProduct";
import { useEditProduct } from "@/hooks/useEditProduct";
import { formatPrice } from "@/lib/formatPrice";


function Products() {
  const { handleAdd, success } = useAddProduct();
  const {
    products,
    error,
    loading,
    totalCount,
    categories,
    fetchProductsPage,
  } = useFetchProducts();
  const {
    handleEdit,
    success: editSuccess,
    error: editError,
  } = useEditProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModel = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formattedFormValue = {
      ...formValue,
      price: Number(formValue.price),
      discountPrice: Number(formValue.discountPrice),
      stock: Number(formValue.stock),
      weight: Number(formValue.weight),
    };

    await handleEdit(formattedFormValue);

    fetchProductsPage();

    if (editSuccess) {
      setSaving(false);
      closeModal();
    } else {
      setSaving(false);
      closeModal();
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const formattedFormValue = {
      ...formValue,
      nameLowerCase: formValue.name.toLowerCase(),
      price: Number(formValue.price),
      discountPrice: Number(formValue.discountPrice),
      stock: Number(formValue.stock),
      weight: Number(formValue.weight),
    };
    await handleAdd(formattedFormValue);

    if (success) {
      setSaving(false);
      closeModal();
    } else {
      setSaving(false);
      closeModal();
    }
  };

  const [formValue, setFormValue] = React.useState({
    id: "",
    image: "",
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
    weight:"",
  });

  useEffect(() => {
    const fetchPage = async () => {
      await fetchProductsPage(currentPage, selectedCategory, searchQuery);
    };

    fetchPage();
  }, [currentPage, selectedCategory, searchQuery]);

  return (
    <div className="wrapper">
      <h1 className="mt-10 text-3xl text-center mb-10">Products</h1>
      <div className="!mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[400px] border-b border-[var(--line)] h-10 px-2 text-sm outline-none text-gray-700"
        />
        <div className="relative w-full md:w-48">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex items-center justify-between border cursor-pointer border-gray-300 bg-white rounded-md px-3 py-2 shadow-sm hover:bg-gray-50"
          >
            <span className="text-gray-700">{selectedCategory}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {open && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    selectedCategory === category
                      ? "bg-gray-100 text-[var(--primary)] font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-end mb-5">
        <button
          type="button"
          onClick={() => {
            handleOpenModel();
            setIsEditing(false);
            setFormValue({
              id: "",
              image: "",
              name: "",
              category: "",
              price: "",
              discountPrice: "",
              stock: "",
              description: "",
              weight:"",
            });
          }}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Product
        </button>
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
              <TableHead className="text-start">S.no</TableHead>
              <TableHead className="text-center">image</TableHead>
              <TableHead className="text-start">Name</TableHead>
              <TableHead className="text-start">category</TableHead>
              <TableHead className="text-start">discount price</TableHead>
              <TableHead className="text-start">price</TableHead> 
              <TableHead className="text-start">weight</TableHead> 
              <TableHead className="text-start">stock</TableHead>
              <TableHead className="text-start">description</TableHead>
              <TableHead className="text-start">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-start">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <img
                      className="w-16 h-16 object-contain mx-auto"
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell className="text-start">{item.name}</TableCell>
                  <TableCell className="text-start">{item.category}</TableCell>
                  <TableCell className="text-start">
                    {formatPrice(Number(item.discountPrice))}
                  </TableCell>
                  <TableCell className="text-start">
                    {formatPrice(Number(item.price))}
                  </TableCell>
                  <TableCell className="text-start">
                    {item.weight}g
                  </TableCell>
                  <TableCell className="text-start">{item.stock}</TableCell>
                  <TableCell className="text-start max-w-[200px] truncate">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          handleOpenModel();
                          setIsEditing(true);
                          setFormValue({
                            id: item.id,
                            image: item.image === null ? "" : item.image,
                            name: item.name,
                            category: item.category,
                            price: item.price?.toString(),
                            discountPrice: item.discountPrice?.toString(),
                            stock: item.stock?.toString(),
                            description: item.description,
                            weight:item.weight,
                          });
                        }}
                        className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--btn-hover-bg)] transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition-all ease-in-out duration-300 cursor-pointer flex items-center gap-3">
                        Delete
                        <FontAwesomeIcon icon={faTrash} />
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
                  {loading ? "Loading products..." : "No products found."}
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
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Add Product"}
            </h3>
            <form
              className="space-y-4"
              onSubmit={isEditing ? handleEditProduct : handleAddProduct}
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Img <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.image}
                  onChange={(e) =>
                    setFormValue({ ...formValue, image: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.name}
                  onChange={(e) =>
                    setFormValue({ ...formValue, name: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.category}
                  onChange={(e) =>
                    setFormValue({ ...formValue, category: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.price}
                  onChange={(e) =>
                    setFormValue({ ...formValue, price: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.discountPrice}
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      discountPrice: e.target.value,
                    })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.stock}
                  onChange={(e) =>
                    setFormValue({ ...formValue, stock: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Weight (in gram) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.weight}
                  onChange={(e) =>
                    setFormValue({ ...formValue, weight: e.target.value })
                  }
                  required
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.description}
                  onChange={(e) =>
                    setFormValue({ ...formValue, description: e.target.value })
                  }
                  required
                  disabled={saving}
                />
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

export default Products;
