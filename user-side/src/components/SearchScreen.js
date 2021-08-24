import "./SearchScreen.css";
import { useState, useEffect,lazy } from "react";
import { searchMovie } from "../Services";
import { getAllGenre } from '../Services';
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from "./Header";
import EmptySearchScreen from "./EmptySearchScreen";
import Card from './Card'
export default function SearchScreen(props) {
  const [pageNumberMovies, setPageNumberMovies] = useState(1);
  const [hasMoreMovies,setHasMoreMovies]=useState(true);
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { searchKeyword } = useParams();
  const [end,setEnd]=useState(false);
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
  }
  useEffect(() => {
    searchMovie(searchKeyword, selectedGenre, 0, (response) => setMovies(response.data));
  }, [searchKeyword, selectedGenre]);

  const fetchmoviedata=async ()=>{
    const URL=await axios.get("https://salty-hollows-74392.herokuapp.com/tmdb/movies/search?genre="+selectedGenre+"&pageNumber="+pageNumberMovies+"&title="+searchKeyword);
    return URL.data;
  }
  const fetchMoremovies=async ()=>
  {
    const new_movies=await fetchmoviedata();
    setMovies([...movies,...new_movies]);
    console.log(new_movies);
    if (new_movies.length===0 || new_movies.length<20){
        setHasMoreMovies(false)
      }
      
      setPageNumberMovies(pageNumberMovies+1) 
  }
  
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
              <div>
                <ErrorBoundary>
                <InfiniteScroll
                 className="searchgrid"
                 dataLength={movies.length}
                 next={fetchMoremovies}
                 hasMore={hasMoreMovies}
                 loader={<Loader type="Oval" color="#6D6767" height={40} width={40}  className="loader"/>}
                 endMessage={<div></div>}
                 >
                  {movies.map((movie, index) => (
                    
                      
                      <Card
                        className="card"
                        title={movie.title}
                        rating={movie.rating}
                        id={movie.id}
                        key={index}
                      ></Card>
                      
                  ))}</InfiniteScroll>
                  </ErrorBoundary>
                </div> : <div className="show-result">No Result Found</div>}
          </div>
        </div>}
        
    </div>
  );
}
