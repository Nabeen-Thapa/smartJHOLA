import React, { ChangeEvent, useState } from "react";
const AddProductForm = () => {
    const [productData, setProductData] = useState({
        category: "",
        productName: "",
        price: 0,
        brand: "",
        stockQuantity: 0,
        productDescription: "",
        discount: 0,
        discountCoupon: null,
        image: "",

    });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({
          ...productData,
          [name]: value,
        });
      };
    const addProductSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", productData);
        // Add your form submission logic here (e.g., API call)
      };
    return (
        <>
            <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-blod mb-6">Add product From</h1>
                <form onSubmit={addProductSubmit} className="space-y-4">
                    <div>
                        <select
                            name="category"
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required>
                            <option value="">Select a category</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="laptop">Laptop</option>
                            <option value="smartwatch">Smartwatch</option>
                            <option value="tablet">Tablet</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            name="productName"
                            onChange={handleChange}
                            placeholder="enter the product Name"
                            className="mt-1 block w-full p-2 v-border border-gray-300 rounders-md shadow-sm focus:ring-indogo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="price"
                            onChange={handleChange}
                             placeholder="enter the product price"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="brand"
                            onChange={handleChange}
                             placeholder="enter the product Brand"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="stockQuantity"
                            onChange={handleChange}
                            placeholder="enter the product stockQuantity"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        {/* <label className="block text-sm font-medium text-gray-700">
                            Product Description
                        </label> */}
                        <textarea
                            name="productDescription"
                            onChange={handleChange}
                             placeholder="enter the product description"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                        />
                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700">
                                Discount (%)
                            </label> */}
                            <input
                                type="number"
                                name="discount"
                                onChange={handleChange}
                                 placeholder="enter the product discount (in precentage)"
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700">
                                Discount Coupon (optional)
                            </label> */}
                            <input
                                type="number"
                                name="discountCoupon"
                                onChange={handleChange}
                                 placeholder="enter the product discount coupon"
                                className="mt-3 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            {/* <label className="block text-sm font-medium text-gray-700">
                                Image URL
                            </label> */}
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="mt-2 mb-6 block w-full p-2  border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default AddProductForm
