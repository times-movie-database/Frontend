import "./SearchScreen.css";
import { useState, useEffect } from "react";
import { searchMovie } from "../Services";
import { getAllGenre } from "../Services";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Header";
import EmptySearchScreen from "./EmptySearchScreen";
import Card from "./Card";
export default function SearchScreen() {
  const [pageNumberMovies, setPageNumberMovies] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { searchKeyword } = useParams();

  //validation for empty search keyword
  const isSearchKeywordEmpty = () => {
    const regex = /[\s\s+/]/;
    return regex.test(searchKeyword) && searchKeyword.length;
  };
  //get genre list from server
  if (genreList.length === 0) {
    getAllGenre().then((res) => {
      setGenreList(res.data);
    });
  }
  //set the genre selected from the drop down menu
  const handleGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  //get the list of movies from server
  useEffect(() => {
    searchMovie(searchKeyword, selectedGenre, 0, (response) =>
      setMovies(response.data)
    );
  }, [searchKeyword, selectedGenre]);

  //get the data of movies on page change
  const fetchmoviedata = async () => {
    const URL = await axios.get(
      "https://salty-hollows-74392.herokuapp.com/tmdb/movies/search?genre=" +
        selectedGenre +
        "&pageNumber=" +
        pageNumberMovies +
        "&title=" +
        searchKeyword
    );
    return URL.data;
  };
  const fetchMoremovies = async () => {
    const new_movies = await fetchmoviedata();
    setMovies([...movies, ...new_movies]); //concat movie data from new page to the previous results
    if (new_movies.length === 0 || new_movies.length < 20) {
      //set the hasMore property to false if the next page is empty or has fewer than 20 elements
      setHasMoreMovies(false);
    }

    setPageNumberMovies(pageNumberMovies + 1); //increment page numnber
  };

  return (
    <div>
      <ErrorBoundary>
        <Header searchBar="yes" addButton="yes" />{" "}
        {/*include header component */}
      </ErrorBoundary>

      {isSearchKeywordEmpty() ? (
        <EmptySearchScreen />
      ) : (
        <div className="search">
          <div className="show-result">Results for "{searchKeyword}"</div>
          <label htmlFor="genre-search" className="text">
            Search Result in{" "}
          </label>
          <select className="genre-menu" onChange={handleGenre}>
            <option value="All">All</option>
            {genreList.map((genre) => (
              <option className="opt" key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <div id="container">
            {movies ? (
              <div>
                <ErrorBoundary>
                  <InfiniteScroll
                    className="searchgrid"
                    dataLength={movies.length}
                    next={fetchMoremovies}
                    hasMore={hasMoreMovies}
                    loader={
                      <Loader
                        type="Oval"
                        color="#6D6767"
                        height={40}
                        width={40}
                        className="loader"
                      />
                    }
                    endMessage={<div></div>}
                  >
                    {/*movie card*/}
                    {movies.map((movie, index) => (
                      <Card
                        className="card"
                        title={movie.title}
                        rating={movie.rating}
                        id={movie.id}
                        key={index}
                      ></Card>
                    ))}
                  </InfiniteScroll>
                </ErrorBoundary>
              </div>
            ) : (
              <div className="show-result">No Result Found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
