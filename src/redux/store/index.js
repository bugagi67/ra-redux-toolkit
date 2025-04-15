import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "../slice/searchSlice";
import { movieIdSlice } from "../slice/descriptionSlice";
import { favotitesSlice } from "../slice/favoritesSlice"

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        movie: movieIdSlice.reducer,
        favorite: favotitesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});