import { createSlice } from "@reduxjs/toolkit";

const artworkSlice = createSlice({
  name: "artwork",
  initialState: {
    artworks: [],
    selectedArtwork: null,
    loading: false,
    error: null,
  },
  reducers: {
    setArtworks: (state, action) => {
      state.artworks = action.payload;
      state.error = null;
    },
    setSelectedArtwork: (state, action) => {
      state.selectedArtwork = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setArtworks, setSelectedArtwork, setLoading, setError } =
  artworkSlice.actions;

export default artworkSlice;
