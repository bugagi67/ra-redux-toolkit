import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
  favorites: [],
  totalFavorites: 0,
  loading: false,
  error: null,
};

export const fetchMovieToFavorites = createAsyncThunk(
  "favorites/fetchIdMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "i=" + id);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "Фильм не найден.");
      }
      const data = await response.json();

      if (data.Error === "Movie not found!") {
        throw new Error("Фильм не найден.");
      } else if (data.Error === "Too many results.") {
        throw new Error("Слишком много результатов.");
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message || "Произошла ошибка сети.");
    }
  }
);

export const favotitesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    removeFavorites: (state, action) => {
        console.log(action.payload)
        state.favorites = state.favorites.filter((item) => item.imdbID !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
        state.totalFavorites = Number(state.favorites.length);
        state.loading = false;
      })
      .addCase(fetchMovieToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFavorites, clearFavorites } =
  favotitesSlice.actions;
