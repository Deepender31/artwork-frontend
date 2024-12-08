import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import artworkSlice from "./slices/artworkSlice";
import orderSlice from "./slices/orderSlice";
import cartSlice from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    artwork: artworkSlice.reducer,
    order: orderSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// Export actions
export const {
  setUser,
  setLoading: setUserLoading,
  setError: setUserError,
  logout,
} = userSlice.actions;
export const {
  setArtworks,
  setSelectedArtwork,
  setLoading: setArtworkLoading,
  setError: setArtworkError,
} = artworkSlice.actions;
export const {
  setOrders,
  setSelectedOrder,
  setLoading: setOrderLoading,
  setError: setOrderError,
} = orderSlice.actions;

export default store;
