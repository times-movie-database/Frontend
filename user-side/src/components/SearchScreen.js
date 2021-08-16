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
      <div id="container">
        <div className="right">
          <label htmlFor="genre-search" className="text">Search Result in </label>
          <select id="genre -search">
            <option>All</option>
            <option>Genre</option>
          </select>
        </div>
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
