import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovie, setSearchValue, clearError } from "../redux/slice/searchSlice";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { searchValue } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event) => {
    dispatch(setSearchValue(event.target.value));
  };

  const handleSearchButtonClick = () => {
    if (location.pathname !== "/") {
      navigate("/")
    }
    dispatch(fetchSearchMovie(searchValue));
    dispatch(setSearchValue(""));
  };

  return (
    <header>
      <div className="favorite-list-button" onClick={() => navigate("/favorites")}>Избранное</div>
      <h1
        onClick={() => {
          navigate("/");
          dispatch(clearError())
        }}
        className="logo"
      >
        OMDb
      </h1>
      <label htmlFor="search">
        <input
          onKeyDown={(event) =>
            event.code === "Enter" && handleSearchButtonClick()
          }
          name="search"
          type="text"
          value={searchValue}
          onChange={onChange}
          placeholder="Искать фильм"
        />
      </label>
      <button
        onClick={handleSearchButtonClick}
        type="button"
        className="search-button"
      >
        Найти
      </button>
    </header>
  );
};

export default SearchBar;
