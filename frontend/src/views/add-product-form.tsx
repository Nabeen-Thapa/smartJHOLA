import axios from "axios";
import React, { useState } from "react";

const AddProductForm: React.FC = () => {
  const [productFormData, setProductData] = useState<{
    username: string;
    category: string;
    productName: string;
    price: string;
    brand: string;
    stockQuanity: string;
    productDescription: string;
    discount: string;
    image: File | null;
  }>({
    username: "",
    category: "",
    productName: "",
    price: "",
    brand: "",
    stockQuanity: "",
    productDescription: "",
    discount: "",
    image: null,
  });

  const [error, setError] = useState<string | null>(null);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProductData((prev) => ({
        ...prev,
        image: files ? files[0] : null,
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productFormDataToSend = new FormData();
    productFormDataToSend.append("username", productFormData.username);
    productFormDataToSend.append("category", productFormData.category);
    productFormDataToSend.append("productName", productFormData.productName);
    productFormDataToSend.append("price", productFormData.price);
    productFormDataToSend.append("brand", productFormData.brand);
    productFormDataToSend.append("stockQuanity", productFormData.stockQuanity);
    productFormDataToSend.append(
      "productDescription",
      productFormData.productDescription
    );
    productFormDataToSend.append("discount", productFormData.discount);
    if (productFormData.image) {
      productFormDataToSend.append("image", productFormData.image);
    }

    try {
      const response = await axios.post(
        "/smartjhola/add-product",
        productFormDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product added successfully!");
      console.log(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add the product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form
        onSubmit={handleProductSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={productFormData.username}
            onChange={handleProductChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={productFormData.category}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={productFormData.productName}
            onChange={handleProductChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={productFormData.price}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={productFormData.brand}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Stock Quantity</label>
          <input
            type="number"
            name="stockQuanity"
            value={productFormData.stockQuanity}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Product Description</label>
          <input
            type="text"
            name="productDescription"
            value={productFormData.productDescription}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Discount</label>
          <input
            type="number"
            name="discount"
            value={productFormData.discount}
            onChange={handleProductChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleProductChange}
            className="w-full text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
