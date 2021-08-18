import Card from "./Card";
import "./SearchScreen.css";
import { useState, useEffect } from "react";
import { getAllmovies} from "../Services";
import { getAllGenre} from '../Services';
import ErrorBoundary from "./ErrorBoundary";
import SearchBar from "./SearchBar";
export default function SearchScreen(props) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllmovies((response) => setMovies(response.data));
  }, []);
  const [genreList,setGenreList]=useState([])
   /*get genre list from server*/
   useEffect(()=>{
    getAllGenre().then((res) => {
      setGenreList(res.data)
  })
  },[])


  return (
    <div className="search">
      <label htmlFor="genre-search" className="text">Search Result in </label>
          <select className="genre-menu">
            <option>All</option>
            {genreList.map((genre)=><option className="opt" key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
      <div id="container">
        <div className="searchgrid">
          {movies.map((movie, index) => (
            <ErrorBoundary>
              <Card
                className="card"
                title={movie.title}
                rating={movie.rating}
                id={movie.id}
              ></Card>
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </div>
  );
}
