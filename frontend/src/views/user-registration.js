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
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const Registration = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        username: '',
        email: '',
        phone: '',
        age: '',
        gender: {
            male: false,
            female: false,
            others: false,
        },
        image: null,
    });
    const [error, setError] = (0, react_1.useState)(null);
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => (Object.assign(Object.assign({}, prev), { gender: Object.assign(Object.assign({}, prev.gender), { [name]: checked }) })));
        }
        else if (type === 'file') {
            setFormData((prev) => (Object.assign(Object.assign({}, prev), { image: files ? files[0] : null })));
        }
        else {
            setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('gender', JSON.stringify(Object.keys(formData.gender).filter((key) => formData.gender[key])));
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        try {
            const response = yield axios_1.default.post('/smartjhola/register', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Registration successful!');
            console.log(response.data);
        }
        catch (err) {
            setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Registration failed.');
        }
    });
    return (<div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="checkbox" name="male" checked={formData.gender.male} onChange={handleChange} className="mr-2"/>
              Male
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="female" checked={formData.gender.female} onChange={handleChange} className="mr-2"/>
              Female
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="others" checked={formData.gender.others} onChange={handleChange} className="mr-2"/>
              Others
            </label>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input type="file" name="image" onChange={handleChange} className="w-full text-gray-700"/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Register
        </button>
      </form>
    </div>);
};
exports.default = Registration;
