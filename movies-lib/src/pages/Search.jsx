import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./MovieGrid.css";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    //console.log(data);
    setMovies(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    const searchQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    //console.log(topRatedUrl);

    getMovies(searchQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>{" "}
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Search;
