import Card from './Card';
import './SearchScreen.css';
import { useState,useEffect } from 'react';
import { getmovie } from '../Services';
export default function SearchScreen(props){
    const [movies,setMovies]=useState([]);
    useEffect(() => {
        getmovie(response => setMovies(response.data));
        
        },[])
    return(
    <div id='container2'>
        <div className='searchgrid'>
            {movies.map((movie,index)=>
             <Card className="card" title={movie.title} rating={movie.rating}></Card>
            )
            }
            
            </div>

    </div>)

}


