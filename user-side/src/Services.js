import axios from "axios";

export function sendMovieToDB(movie, successCB, errorCB){
    const URL="http://localhost:4200/movies"
    axios.post(URL,movie).then(successCB).catch(errorCB);
}