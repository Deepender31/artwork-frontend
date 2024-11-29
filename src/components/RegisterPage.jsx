import React, { useState } from "react";
import NavigationBar from "./NavigationBar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    profileImage: null,
    role: "user", // Default to artist
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add logic to handle registration
  };

  return (
    <>
      <NavigationBar className="mb-10" />
      <div className="min-h-screen flex items-center justify-center  p-5">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Create Your Account
          </h2>
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-md transition-colors duration-300 ${
                formData.role === "artist"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, role: "artist" })}
            >
              Become an Artist
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-md transition-colors duration-300 ${
                formData.role === "user"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, role: "user" })}
            >
              Join as Normal User
            </button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image (JPG only)
              </label>
              <input
                type="file"
                accept=".jpg"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 w-full transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
