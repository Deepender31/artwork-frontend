import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import {authAPI} from "../services/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (validateForm()) {
      try {
        
        
        // Append all form fields to FormData
        

        // If no profile image was selected, append the default avatar URL
        
        const response = await authAPI.register(formData);
        
        if (response.success) {
          // Redirect to login page or dashboard
          console.log("Registration successful");
          localStorage.setItem("currentUser", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          localStorage.setItem("isAuthenticated", true);
          navigate("/");
        } else {
          setErrors({
            error: response.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors({
          error: "An error occurred while registering. Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <NavigationBar className="mb-10" />
      <div className="min-h-screen flex items-center justify-center p-5">
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
            {errors.error && (
              <div className="text-red-500 text-sm text-center">{errors.error}</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2`}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2`}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2`}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
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
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
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
                className={`mt-1 block w-full rounded-md border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out p-2`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
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
