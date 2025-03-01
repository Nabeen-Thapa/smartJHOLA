import React, { useState, ChangeEvent, FormEvent } from "react";
import Style from "../../Styles/Style.js";



const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-3 rounded-lg w-3/4 max-w-md" style={Style()}>
        <h2 className="text-3xl font-bold text-center m-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your full Name"
            className="w-3/4 border rounded"
             onChange={handleChange} style={Style()}
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            className="w-3/4 p-3 border rounded"
             onChange={handleChange} style={Style()}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-3/4 p-3 border rounded"
             onChange={handleChange} style={Style()}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your Phone"
            className="w-3/4 p-3 border rounded"
             onChange={handleChange} style={Style()}
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your Age"
            className="w-3/4 p-3 border rounded"
             onChange={handleChange} style={Style()}
          />
          <select
            name="gender"
            className="w-3/4 p-3 border rounded text=-blue-300"
             onChange={handleChange} style={Style()}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit"
            className="w-3/4 bg-green-500 text-white p-2 m-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
