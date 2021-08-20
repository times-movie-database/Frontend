import Card from "./Card";
import "./SearchScreen.css";
import { useState, useEffect } from "react";
import { searchMovie } from "../Services";
import { getAllGenre } from '../Services';
import ErrorBoundary from "./ErrorBoundary";
import SearchBar from "./SearchBar";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from "./Header";
import EmptySearchScreen from "./EmptySearchScreen";
export default function SearchScreen(props) {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const { searchKeyword } = useParams();

  const isSearchKeywordEmpty = () => {
    console.log(searchKeyword.length);
    const regex = /[\s\s+/g]/;
    return regex.test(searchKeyword) && searchKeyword.length;
  }

  /*get genre list from server*/
  if (genreList.length === 0) {
    getAllGenre().then((res) => {
      setGenreList(res.data)
    }
    )
  }
  const handleGenre = (event) => {
    setSelectedGenre(event.target.value);
    setPageNumber(0);
  }
  useEffect(() => {
    searchMovie(searchKeyword, selectedGenre, pageNumber, (response) => setMovies(response.data));
  }, [searchKeyword, selectedGenre, pageNumber]);

  return (

    <div>
      <ErrorBoundary>
        <Header searchBar="yes" addButton="yes" />
      </ErrorBoundary>

      {isSearchKeywordEmpty() ? <EmptySearchScreen/> :
        <div className="search">

          <div className="show-result">Results for "{searchKeyword}"</div>
          <label htmlFor="genre-search" className="text">Search Result in </label>
          <select className="genre-menu" onChange={handleGenre}>
            <option value='All'>All</option>
            {genreList.map((genre) => <option className="opt" key={genre.id} value={genre.name}>{genre.name}</option>)}
          </select>
          <div id="container">
            {movies ?
              <div className="searchgrid">
                
                  {movies.map((movie, index) => (
                    <ErrorBoundary>
                      <Card
                        className="card"
                        title={movie.title}
                        rating={movie.rating}
                        id={movie.id}
                        key={index}
                      ></Card>
                    </ErrorBoundary>
                  ))}

                </div> : <div className="show-result">No Result Found</div>}
          </div>
        </div>}
    </div>
  );
}
