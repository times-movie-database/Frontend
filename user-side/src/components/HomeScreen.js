import { useState, useEffect } from "react";
import "./HomeScreen.css";
import { getTopTenMovies } from "../Services";
import ErrorBoundary from "./ErrorBoundary.js";
import Header from "./Header.js";
import { getAllGenre } from "../Services";
import Loader from "react-loader-spinner";
import Card from "./Card";

export default function HomeScreen() {
  const [loader, setLoader] =
    useState(false); /* set initial value of loader to false*/
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  /* get gerne list from server*/
  if (genreList.length === 0) {
    getAllGenre().then((res) => {
      setGenreList(res.data);
    });
  }

  /*handle the change in genre from drop dowm*/
  const handleGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  /* get top ten overall movies or based on genre from the server*/
  useEffect(() => {
    getTopTenMovies(selectedGenre, (response) => {
      setMovies(response.data);
      setLoader(true);
    });
  }, [selectedGenre]);

  return (
    <div>
      <ErrorBoundary>
        <Header searchBar="yes" addButton="yes" />
      </ErrorBoundary>
      <div id="container1">
        <div id="dropdown">
          <label htmlFor="menu1" className="fn">
            Top 10 Movies in{" "}
          </label>
          <select className="genre-menu" onChange={handleGenre}>
            <option value="All">All</option>
            {/* Display the list of genres */}
            {genreList.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        {/*Display loader if movies object is empty else display movie cards */}
        {loader ? (
          <div className="grid">
            {movies.map((movie, index) => (
              <ErrorBoundary>
                <Card
                  id={movie.id}
                  className="card"
                  title={movie.title}
                  rating={movie.rating}
                  key={index}
                ></Card>
              </ErrorBoundary>
            ))}
          </div>
        ) : (
          <Loader
            type="Oval"
            color="#6D6767"
            height={80}
            width={80}
            className="loader"
          />
        )}
      </div>
    </div>
  );
}
