import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ListMovie from "../components/ListMovie";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovie } from "../redux/slice/searchSlice";
import Loader from "../components/status/Loader";

const MainPages = () => {
  const { movieList, loading, error } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieList.length === 0 && error=== null) {
      dispatch(fetchSearchMovie("avengers"));
    } 
  }, [dispatch, movieList, error]);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div>
        <SearchBar />
        <ListMovie />
      </div>
    </>
  );
};

export default MainPages;
