"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const AddProductForm = () => {
    const [productFormData, setProductData] = (0, react_1.useState)({
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
    const [error, setError] = (0, react_1.useState)(null);
    const handleProductChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setProductData((prev) => (Object.assign(Object.assign({}, prev), { image: files ? files[0] : null })));
        }
        else {
            setProductData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        }
    };
    const handleProductSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        const productFormDataToSend = new FormData();
        productFormDataToSend.append("username", productFormData.username);
        productFormDataToSend.append("category", productFormData.category);
        productFormDataToSend.append("productName", productFormData.productName);
        productFormDataToSend.append("price", productFormData.price);
        productFormDataToSend.append("brand", productFormData.brand);
        productFormDataToSend.append("stockQuanity", productFormData.stockQuanity);
        productFormDataToSend.append("productDescription", productFormData.productDescription);
        productFormDataToSend.append("discount", productFormData.discount);
        if (productFormData.image) {
            productFormDataToSend.append("image", productFormData.image);
        }
        try {
            const response = yield axios_1.default.post("/smartjhola/add-product", productFormDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product added successfully!");
            console.log(response.data);
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Failed to add the product.");
        }
    });
    return (<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleProductSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium text-gray-700">Username</label>
          <input type="text" name="username" value={productFormData.username} onChange={handleProductChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <input type="text" name="category" value={productFormData.category} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Product Name</label>
          <input type="text" name="productName" value={productFormData.productName} onChange={handleProductChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Price</label>
          <input type="text" name="price" value={productFormData.price} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Brand</label>
          <input type="text" name="brand" value={productFormData.brand} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Stock Quantity</label>
          <input type="number" name="stockQuanity" value={productFormData.stockQuanity} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Product Description</label>
          <input type="text" name="productDescription" value={productFormData.productDescription} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Discount</label>
          <input type="number" name="discount" value={productFormData.discount} onChange={handleProductChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input type="file" name="image" onChange={handleProductChange} className="w-full text-gray-700"/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Add Product
        </button>
      </form>
    </div>);
};
exports.default = AddProductForm;
