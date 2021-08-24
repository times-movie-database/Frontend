import "./SearchScreen.css";
import { useState, useEffect,lazy,Suspense } from "react";
import { searchMovie } from "../Services";
import { getAllGenre } from '../Services';
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from "./Header";
import EmptySearchScreen from "./EmptySearchScreen";
const Card=lazy(()=>import ('./Card'));
export default function SearchScreen(props) {
  const [pageNumberMovies, setPageNumberMovies] = useState(1);
  const [hasMoreMovies,setHasMoreMovies]=useState(true);
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const { searchKeyword } = useParams();

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

      
        <div className="search">

          <div className="show-result">Results for "{searchKeyword}"</div>
          <label htmlFor="genre-search" className="text">Search Result in </label>
          <select className="genre-menu" onChange={handleGenre}>
            <option value='All'>All</option>
            {genreList.map((genre) => <option className="opt" key={genre.id} value={genre.name}>{genre.name}</option>)}
          </select>
          <Suspense fallback={<h1>Loading....</h1>}>
          <div id="container">
            {movies ?
              <div className="searchgrid">
                <ErrorBoundary>
                <InfiniteScroll
                 className="searchgrid"
                 dataLength={movies.length}
                 next={fetchMoremovies}
                 hasMore={hasMoreMovies}
                 loader={<h4>Loading....</h4>}
                 endMessage={<div>No more results to display</div>}
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
          </div></Suspense>
        </div>
    </div>
  );
}
