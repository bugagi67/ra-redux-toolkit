import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/status/Loader";
import HasError from "../components/status/HasError";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const FavoritesPages = () => {
  const { favorites, error, loading } = useSelector((state) => state.favorite);

  return (
    <>
      <SearchBar />
      <main className="list-movie">
        {error !== null && <HasError error={error} />}
        {loading && <Loader />}
        {favorites &&
          favorites.map((item) => {
            return <MovieCard key={item.imdbID} movie={item} />;
          })}
      </main>
    </>
  );
};

export default FavoritesPages;
