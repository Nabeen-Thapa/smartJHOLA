import React, { useState } from 'react';
import axios from 'axios';

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    gender: {
      male: boolean;
      female: boolean;
      others: boolean;
    };
    image: File | null;
  }>({
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

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        gender: {
          ...prev.gender,
          [name]: checked,
        },
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        image: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('age', formData.age);
    formDataToSend.append(
      'gender',
      JSON.stringify(Object.keys(formData.gender).filter((key) => formData.gender[key as keyof typeof formData.gender]))
    );
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('/smartjhola/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registration successful!');
      console.log(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-2">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="male"
                checked={formData.gender.male}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="female"
                checked={formData.gender.female}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="others"
                checked={formData.gender.others}
                onChange={handleChange}
                className="mr-2"
              />
              Others
            </label>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
