import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //check if user is logged in get user from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-8 w-8"
                  src="https://ui-avatars.com/api/?name=Art+Gallery&background=random"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
          {/* Move Desktop Menu to the right */}
          <div className="hidden md:flex md:space-x-8">
            <Link
              to="/gallery"
              className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Gallery
            </Link>
            <Link
              to="/artists"
              className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Artists
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === "artist" ? "/artist" : "/user"}
                  className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
            {/* {link to cart} */}
            <Link
              to="/cart"
              className="text-gray-900 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Cart
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu - you can use any icon library or SVG */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 z-50">
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
            >
              Gallery
            </Link>
            <Link
              to="/artists"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
            >
              Artists
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === "artist" ? "/artist" : "/user"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
              >
                Login/Signup
              </Link>
            )}
            {/* {link to cart} */}
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-50"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
