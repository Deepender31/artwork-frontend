import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.error = null;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
}); 

export const { setOrders, setSelectedOrder, setLoading, setError } =
  orderSlice.actions;

export default orderSlice;
