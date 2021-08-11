import Card from "./Card.js";
import { useState,useEffect } from "react";
import './HomeScreen.css';
import { getmovie } from '../Services';
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
        <Card className="card" title={movie.title} rating={movie.rating}></Card>)}
        </div>
        </div>
        
    )
}