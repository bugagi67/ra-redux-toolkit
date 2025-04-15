import React from "react";
import { RowInfoMovie } from "./RowInfoMovie";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieToFavorites,
  removeFavorites,
} from "../redux/slice/favoritesSlice";

const MovieDetailDescription = ({ movie }) => {
  const { favorites } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const backgroundStyle = (rait) => {
    if (Number(rait) > 7.5) {
      return "#13c013";
    } else if (Number(rait) < 5) {
      return "#fc0f23";
    } else {
      return "#e4b70f";
    }
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
    <>
      <div className="wrapper-description">
        <aside>
          <img src={movie.Poster} alt={movie.Title} />
        </aside>
        <div className="detail-description">
          <div className="description-head">
            <div className="title-rait">
              <h1>{movie.Title}</h1>{" "}
              <div
                className="movie-raiting"
                style={{ backgroundColor: backgroundStyle(movie.imdbRating) }}
              >
                {movie.imdbRating}
              </div>
              <div
                onClick={() => handleClickFavorites(movie.imdbID)}
                style={{ textShadow: "1px 1px 2px rgba(2, 2, 2, 2)",
                  fontSize: "2em",
                  color: findFavorites(movie.imdbID)
                    ? "#ffe142"
                    : "rgb(51 51 51)",
                }}
                className="head-detail-rait"
              >
                ★
              </div>
            </div>
            <p className="description-plot">
              <span>Сюжет: </span>
              {movie.Plot}
            </p>
          </div>
          <div className="detail-description-content">
            <h3>О фильме</h3>
            <br />
            <RowInfoMovie nameRow={"Год производства:"} info={movie.Released} />
            <RowInfoMovie nameRow={"Страна:"} info={movie.Country} />
            <RowInfoMovie nameRow={"Жанр:"} info={movie.Genre} />
            <RowInfoMovie nameRow={"Режиссер:"} info={movie.Director} />
            <RowInfoMovie nameRow={"Сценарий:"} info={movie.Writer} />
            <RowInfoMovie nameRow={"Актеры:"} info={movie.Actors} />
            <RowInfoMovie nameRow={"Награды:"} info={movie.Awards} />
            <RowInfoMovie nameRow={"Сборы:"} info={movie.BoxOffice} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailDescription;
