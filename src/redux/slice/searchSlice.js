import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  totalResults: "",
  searchValue: "",
  loading: false,
  error: null,
};

export const fetchSearchMovie = createAsyncThunk(
  "search/fetchMovie",
  async (searchValue, { rejectWithValue }) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "s=" + searchValue
      );
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

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovie.fulfilled, (state, action) => {
        state.movieList = action.payload.Search;
        state.totalResults = action.payload.totalResults || "";
        state.loading = false;
      })
      .addCase(fetchSearchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movieList = [];
        state.totalResults = "";
      });
  },
});

export const { setSearchValue, clearError } = searchSlice.actions;
