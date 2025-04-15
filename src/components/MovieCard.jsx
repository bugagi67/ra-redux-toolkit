import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchIdMovie } from "../redux/slice/descriptionSlice";
import { movieIdSlice } from "../redux/slice/descriptionSlice";
import {
  fetchMovieToFavorites,
  removeFavorites,
} from "../redux/slice/favoritesSlice";

const MovieCard = ({ movie }) => {
  const { favorites } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearMovieItem } = movieIdSlice.actions;

  const handleClickCard = (id) => {
    navigate(`/movie/${id}`);
    dispatch(fetchIdMovie(id));
  };

  const findFavorites = (id) => {
    const style = favorites.find((item) => item.imdbID === id);
    if (style) {
      return true;
    } else {
      return false;
    }
  };

  const handleClickFavorites = (id) => {
    if (findFavorites(id)) {
      dispatch(removeFavorites(id));
    } else {
      dispatch(fetchMovieToFavorites(id));
    }
  };

  return (
    <div className="movie-card">
      <div className="img-wrapper">
        <div
          onClick={() => handleClickFavorites(movie.imdbID)}
          className="favorite"
          style={{ color: findFavorites(movie.imdbID) ? "#ffe142" : "#fff" }}
        >
          ★
        </div>
        <img
          onClick={() => {
            dispatch(clearMovieItem());
            handleClickCard(movie.imdbID);
          }}
          src={movie.Poster}
          alt={movie.Title}
        />
      </div>
      <div
        onClick={() => {
          dispatch(clearMovieItem());
          handleClickCard(movie.imdbID);
        }}
        className="content-wrapper"
      >
        <div className="movie-name-card">{movie.Title}</div>
        <div className="movie-release-card">
          <span className="release-year-card">{movie.Year}</span>
          <span className="type-card">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
