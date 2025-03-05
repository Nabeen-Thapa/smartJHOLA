import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation Links (Left Side) */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-gray-800">MyLogo</a>

            {/* Desktop Menu (Left Side) */}
            <div className="hidden md:flex space-x-4">
              <a href="/"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">
                Home</a>
              <a href="/about"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">About</a>
              <a href="/services"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Services</a>
              <a href="/contact"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Contact</a>
                <a href="/addProduct"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Add product</a>
                 <a href="/addCategory"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium">Add category</a>
            </div>
        </div>

          {/* Right Side (Login and Sign Up Buttons) */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <a href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition duration-300"> Login</a>

            {/* Sign Up Button */}
            <a href="/signup"
             className="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition duration-300">Sign Up</a>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              About
            </a>
            <a
              href="/services"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Services
            </a>
            <a
              href="/contact"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Contact
            </a>
            <a
              href="/login"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Login
            </a>
            <a
              href="/signup"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            > Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;