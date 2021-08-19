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
export function searchMovie(title,genre_id,successCB,errorCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/search?title="+title+"&genre="+genre_id; 
    const response=axios.get(URL).then(successCB).catch(errorCB);
    return response;
}
export function getAllmovies(successCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/find-all?pageNumber=0"
    axios.get(URL).then(successCB)
}
export function getMovieDetails(movie_id,successCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id;
    axios.get(URL).then(successCB)
}
export function getMovieReviews(movie_id,successCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id+"/review?pageNumber=1";
    axios.get(URL).then(successCB)
}
export function postMovieReview(user_review,movie_id,successCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id+"/"+"review";
    axios.put(URL,{user_review}).then(successCB)
}