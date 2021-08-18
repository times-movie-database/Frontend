import axios from "axios";

export function sendMovieToDB(movieDetails, successCB, errorCB){
    axios.post(process.env.REACT_APP_POST_MOVIE_ENDPOINT,movieDetails).then(successCB).catch(errorCB);
}

export async function getAllGenre( successCB, errorCB ){
    const response = axios.get(process.env.REACT_APP_GET_GENRE_ENDPOINT);
    return response;
}
export function updateMovieInDB( movieID, movieDetails , successCB, errorCB){
    axios.put(process.env.REACT_APP_PUT_MOVIE_ENDPOINT+movieID, movieDetails).then(successCB).catch(errorCB);
} 
export function getmovie(successCB,l=1000){
    const URL="http://localhost:4200/movies"
    axios.get(URL,{params:{_limit:l}}).then(successCB)
}