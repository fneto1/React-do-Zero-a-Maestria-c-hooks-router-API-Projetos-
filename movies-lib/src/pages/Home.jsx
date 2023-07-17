import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./MovieGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  //console.log(moviesURL, apiKey);
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    //console.log(data);
    setTopMovies(data.results);
    //console.log(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}/top_rated?${apiKey}`;

    //console.log(topRatedUrl);

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes: </h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Home;
