import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import EditButton from "../common/editButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
  };

  const [formValue, setFormValue] = React.useState({
    img: "",
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    description: "",
  });

  const shopItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 79.99,
      discountPrice: 59.99,
      stock: 24,
      rating: 4.5,
      reviews: 128,
      image: "https://modernwears.pk/wp-content/uploads/2023/09/16.jpg",
      description:
        "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    },
    {
      id: 2,
      name: "Smart Watch Pro X",
      category: "Electronics",
      price: 149.99,
      discountPrice: 129.99,
      stock: 15,
      rating: 4.2,
      reviews: 89,
      image:
        "https://images.priceoye.pk/hw-x-pro-series-10-smart-watch-pakistan-priceoye-c9we2-500x500.webp",
      description:
        "Fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.",
    },
    {
      id: 3,
      name: "Men’s Casual Denim Jacket",
      category: "Fashion",
      price: 49.99,
      discountPrice: 39.99,
      stock: 42,
      rating: 4.7,
      reviews: 203,
      image:
        "https://nstore.com.pk/cdn/shop/files/IMG-20241102-WA0029.jpg?v=1730544223",
      description:
        "Stylish denim jacket perfect for casual wear and outdoor adventures.",
    },
    {
      id: 4,
      name: "Women’s Running Shoes",
      category: "Footwear",
      price: 69.99,
      discountPrice: 54.99,
      stock: 30,
      rating: 4.4,
      reviews: 175,
      image:
        "https://cdn.adsport.cz/zbozi/asics/1200x630/asics-gel-nimbus-25-w_1012B356-701_SB-FR.jpg",
      description:
        "Lightweight running shoes with breathable mesh and flexible soles.",
    },
    {
      id: 5,
      name: "Gaming Keyboard RGB",
      category: "Electronics",
      price: 89.99,
      discountPrice: 69.99,
      stock: 18,
      rating: 4.8,
      reviews: 97,
      image:
        "https://static3.webx.pk/files/821/Images/k551-rgb-1-1-821-0-260722125220404.jpg",
      description:
        "Mechanical RGB keyboard with anti-ghosting keys and customizable lighting.",
    },
    {
      id: 6,
      name: "Cotton Crew Neck T-Shirt",
      category: "Fashion",
      price: 19.99,
      discountPrice: 14.99,
      stock: 75,
      rating: 4.3,
      reviews: 312,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK1qNkPqq1x4W2R_PRm5BatfYA7PjrQ0nisg&s",
      description:
        "Soft and comfortable 100% cotton T-shirt, available in multiple colors.",
    },
    {
      id: 7,
      name: "Wooden Study Table",
      category: "Furniture",
      price: 159.99,
      discountPrice: 139.99,
      stock: 9,
      rating: 4.6,
      reviews: 45,
      image:
        "https://trendwoodpk.com/cdn/shop/files/FB_IMG_1595144205208.jpg?v=1741602069&width=500",
      description:
        "Elegant wooden study table with storage drawers and a smooth finish.",
    },
    {
      id: 8,
      name: "LED Desk Lamp",
      category: "Home & Living",
      price: 29.99,
      discountPrice: 24.99,
      stock: 33,
      rating: 4.5,
      reviews: 84,
      image:
        "https://www.flashsale.pk/image/cache/data/products/100941/blitzwolf-bw-lt1-eye-protection-smart-dimmable-led-desk-lamp-with-2-1a-usb-charging-port-100941-1-800x800.webp",
      description:
        "Adjustable LED desk lamp with touch control and 3 brightness levels.",
    },
    {
      id: 9,
      name: "Men’s Leather Wallet",
      category: "Accessories",
      price: 34.99,
      discountPrice: 29.99,
      stock: 64,
      rating: 4.1,
      reviews: 58,
      image:
        "https://www.waldorleather.com/cdn/shop/files/DSC01067-Enhanced-NR_2.jpg?v=1734092186",
      description:
        "Premium leather wallet with multiple card slots and a sleek design.",
    },
    {
      id: 10,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 24.99,
      discountPrice: 19.99,
      stock: 48,
      rating: 4.4,
      reviews: 122,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREB6t0E6tGM740gk43HFcCwqzaFz2BHsLXsQ&s",
      description:
        "Ergonomic wireless mouse with silent clicks and long-lasting battery.",
    },
    {
      id: 11,
      name: "Ceramic Coffee Mug",
      category: "Home & Kitchen",
      price: 12.99,
      discountPrice: 9.99,
      stock: 120,
      rating: 4.9,
      reviews: 441,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQboJTse7Ky0rAlMuwait650Wj7efLo-h-PEw&s",
      description:
        "Durable ceramic mug, perfect for coffee, tea, or hot chocolate.",
    },
    {
      id: 12,
      name: "Backpack 30L",
      category: "Bags",
      price: 59.99,
      discountPrice: 44.99,
      stock: 37,
      rating: 4.6,
      reviews: 191,
      image:
        "https://drytidegear.com/wp-content/uploads/30L-waterproof-backpack-back-side.jpg",
      description:
        "Water-resistant 30L backpack ideal for travel, work, or school.",
    },
  ];
  return (
    <div className="wrapper">
      <h1 className="mt-10 text-3xl text-center">Products</h1>
      <div className="">
        <Table>
          <TableCaption>A list of your products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">image</TableHead>
              <TableHead className="text-start">Name</TableHead>
              <TableHead className="text-start">category</TableHead>
              <TableHead className="text-start">price</TableHead>
              <TableHead className="text-start">discount price</TableHead>
              <TableHead className="text-start">stock</TableHead>
              <TableHead className="text-start">description</TableHead>
              <TableHead className="text-start">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shopItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell className="text-start">{item.name}</TableCell>
                <TableCell className="text-start">{item.category}</TableCell>
                <TableCell className="text-start">{item.price}</TableCell>
                <TableCell className="text-start">
                  {item.discountPrice}
                </TableCell>
                <TableCell className="text-start">{item.stock}</TableCell>
                <TableCell className="text-start max-w-[100px] truncate">
                  {item.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-start gap-3">
                    <EditButton onClick={() => {}} />
                    <button className="w-full bg-red-500 text-white py-2 rounded hover:opacity-80 transition-all ease-in-out duration-200 cursor-pointer px-1">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
            <h3 className="text-xl font-semibold mb-4">Edit Signup Page</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Img <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={formValue.img}
                  onChange={(e) =>
                    setFormValue({ ...formValue, img: e.target.value })
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
