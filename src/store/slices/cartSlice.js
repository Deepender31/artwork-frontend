import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : {
          items: [],
          isLoading: false,
          error: null,
        };
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return { items: [], isLoading: false, error: null };
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCartStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.isLoading = false;
      state.error = null;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addToCartFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  updateQuantity,
  removeFromCart,
  setLoading,
  clearCart,
} = cartSlice.actions;

export default cartSlice;
