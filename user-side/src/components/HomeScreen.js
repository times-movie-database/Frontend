import Card from "./Card.js";
import { useState,useEffect } from "react";
import './HomeScreen.css';
import { getmovie } from '../Services';
import ErrorBoundary from "./ErrorBoundary.js";
export default function HomeScreen(){
    const [movies,setMovies]=useState([]);
    useEffect(() => {
        getmovie(response => setMovies(response.data),10);
        
        },[])
    return(
        <div id="container1">
            <div id="dropdown" >
            <label htmlFor="menu1" className='fn'>Top 10 in </label>
            <select id='menu1'>
            <option>Genre</option>
            <option>All</option>
        </select>
            </div>
        <div className='grid'>
        {movies.map((movie)=>
        <ErrorBoundary><Card className="card" title={movie.title} rating={movie.rating}></Card></ErrorBoundary>)}
        </div>
        </div>
        
    )
}