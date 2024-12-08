import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser, setUserLoading, setUserError } from '../store/store';
import { authAPI } from '../services/api';
import NavigationBar from "./NavigationBar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(setUserLoading(true));
      dispatch(setUserError(null));

      // Call login API
      const userData = await authAPI.login(email, password);
      console.log(userData);
      console.log(userData.user);
      
      // Store user data in Redux
      dispatch(setUser(userData.user));
      
      // Store token in localStorage
      localStorage.setItem('token', userData.token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('currentUser', JSON.stringify(userData.user));
      // Redirect to home page
      navigate("/");
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Login failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Login
          </h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>
            <button
              type="button"
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
