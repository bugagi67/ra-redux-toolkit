import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieDetailDescription from "../components/MovieDetailDescription";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HasError from "../components/status/HasError";
import { fetchIdMovie } from "../redux/slice/descriptionSlice";
import Loader from "../components/status/Loader";

const MovieDescription = () => {
  const { id } = useParams();
  const { movieItem, loading, error } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && movieItem?.imdbID !== id && !loading && !error) {
      dispatch(fetchIdMovie(id));
    }
  }, [id, dispatch, movieItem?.imdbID, loading, error]);

  if (loading || !movieItem) {
    return <Loader />;
  }

  if (error) {
    return <HasError />;
  }

  return (
    <>
      <SearchBar />
      <MovieDetailDescription movie={movieItem} />
    </>
  );
};

export default MovieDescription;
