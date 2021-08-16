import Card from "./Card";
import "./SearchScreen.css";
import { useState, useEffect } from "react";
import { getmovie } from "../Services";
import ErrorBoundary from "./ErrorBoundary";
export default function SearchScreen(props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getmovie((response) => setMovies(response.data));
  }, []);
  return (
    <div className="search">
      <label htmlFor="genre-search" className="text">Search Result in </label>
          <select className="genre-menu">
            <option>All</option>
            <option>Genre</option>
          </select>
      <div id="container">
        <div className="searchgrid">
          {movies.map((movie, index) => (
            <ErrorBoundary>
              <Card
                className="card"
                title={movie.title}
                rating={movie.rating}
              ></Card>
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </div>
  );
}
