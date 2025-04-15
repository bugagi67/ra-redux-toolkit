import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
    movieItem: {},
    loading: false,
    error: null,
}

export const fetchIdMovie = createAsyncThunk(
    "movie/fetchIdMovie",
    async (id, { rejectWithValue }) => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "i=" + id
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


export const movieIdSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovieItem: (state) => {
      state.movieItem = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIdMovie.fulfilled, (state, action) => {
        state.movieItem = action.payload;
        state.loading = false;
        
      })
      .addCase(fetchIdMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.movieItem = [];
      });
  },
});