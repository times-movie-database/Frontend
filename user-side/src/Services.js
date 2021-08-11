import axios from "axios";

export function sendMovieToDB(movie, successCB, errorCB){
    const URL="http://localhost:4200/movies"
    axios.post(URL,movie).then(successCB).catch(errorCB);
}
export function getmovie(successCB,l=1000){
    const URL="http://localhost:4200/movies"
    axios.get(URL,{params:{_limit:l}}).then(successCB)
}