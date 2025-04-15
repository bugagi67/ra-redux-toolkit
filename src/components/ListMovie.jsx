import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import HasError from "./status/HasError";

const ListMovie = () => {
  const { movieList, error } = useSelector((state) => state.search);

  return (
    <main className="list-movie">
      {error !== null && <HasError error={error}/>}
      {movieList && movieList.map((item) => {
        return <MovieCard key={item.imdbID} movie={item}/>;
      })}
    </main>
  );
};

export default ListMovie;
