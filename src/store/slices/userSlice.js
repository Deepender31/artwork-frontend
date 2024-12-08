import { createSlice } from "@reduxjs/toolkit";
const isAuthenticated = localStorage.getItem("isAuthenticated") || false;
const currentUser = localStorage.getItem("currentUser") || null;
const token = localStorage.getItem("token") || null;
const userSlice = createSlice({
  name: "user",

  initialState: {
    currentUser: currentUser,
    isAuthenticated: isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, logout } = userSlice.actions;

export default userSlice;
