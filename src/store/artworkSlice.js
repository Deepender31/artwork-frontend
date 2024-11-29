import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArtworkById = createAsyncThunk(
  "artwork/fetchById",
  async (artworkId) => {
    const response = await axios.get(`/api/artworks/${artworkId}`);
    return response.data;
  }
);

const artworkSlice = createSlice({
  name: "artwork",
  initialState: {
    artwork: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworkById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtworkById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.artwork = action.payload;
      })
      .addCase(fetchArtworkById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default artworkSlice.reducer;
