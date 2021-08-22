import { useState,useEffect,lazy,Suspense } from "react";
import './HomeScreen.css';
import { getTopTenMovies } from '../Services';
import ErrorBoundary from "./ErrorBoundary.js";
import Header from "./Header.js";
import { getAllGenre} from '../Services';
const Card=lazy(()=>import ('./Card'));
export default function HomeScreen(){
    const [movies,setMovies]=useState([]);
    const [genreList,setGenreList]=useState([]);
    const [selectedGenre,setSelectedGenre]=useState("All");
    if (genreList.length===0){
        getAllGenre().then((res) => {
            setGenreList(res.data)
        })
    }
    const handleGenre=(event)=>{
        setSelectedGenre(event.target.value);
    }

    useEffect(()=>{
        getTopTenMovies(selectedGenre,response => setMovies(response.data));

    },[selectedGenre])
    
    return(
        <div>
            <ErrorBoundary>
              <Header searchBar="yes" addButton="yes" />
            </ErrorBoundary>
        <div id="container1">
            <div id="dropdown" >
            <label htmlFor="menu1" className='fn'>Top 10 in </label>
            <select className='genre-menu' onChange={handleGenre}>
            <option value="All">All</option>
            {genreList.map((genre)=><option key={genre.id} value={genre.name}>{genre.name}</option>)}
        </select>
            </div>
        <div className='grid'><Suspense fallback={<h1>Loading....</h1>}>
        {movies.map((movie,index)=>
        <ErrorBoundary><Card id={movie.id}className="card" title={movie.title} rating={movie.rating} key={index}></Card></ErrorBoundary>)}
        </Suspense></div>
        </div>
        </div>
        
    )
}