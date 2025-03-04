import React, { useState, ChangeEvent, FormEvent } from "react";
import Style from "../../Styles/Style.tsx";
import axios from "axios";
import { signup } from "../../services/user.api.tsx";


interface SignupDataType {
  name: string;
  username: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
}

const Signup = () => {
  const [formData, setFormData] = useState <SignupDataType>({
    name: "",
    username: "",
    email: "",
    phone: "",
    age: 0,
    gender: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    try {

        // const payload = {
        //     ...formData,
        //     age: Number(formData.age), // Convert age to a number
        // };
        // const userSignupResponce = await axios.post(
        //     `http://localhost:5500/smartjhola/user/register`,
        //     formData,
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // );
        // console.log("Success:", userSignupResponce.data);

        const data = await signup(formData);
        console.log("Success:", data);
        alert("Signup successful!");
    } catch (error) {
        console.error("Error:", error);
        alert("Signup failed. Please try again.");
    }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full" style={Style()} >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Enter your full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="text" name="username" placeholder="Enter your Username" value={formData.username} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="tel" name="phone" placeholder="Enter your Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="number" name="age" placeholder="Enter your Age" value={formData.age} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
