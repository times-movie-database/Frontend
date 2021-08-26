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
export function getMovies(keyword,successCB,errorCB){
    const URL="http://localhost:4200/movies"
    axios.get(URL).then(successCB).catch(errorCB);
}
export function searchMovie(title,genre,pageNumber,successCB,errorCB){
    
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/search?genre="+genre+"&pageNumber="+pageNumber+"&title="+title; 
    axios.get(URL).then(successCB).catch(errorCB);
    
}
export function getAllmovies(successCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/find-all?pageNumber=0"
    axios.get(URL).then(successCB)
}
export function getMovieDetails(movie_id,successCB,errorCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id;
    axios.get(URL).then(successCB).catch(errorCB)
}
export function getMovieReviews(movie_id,pagenumber,successCB,errorCB){
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id+"/review?pageNumber="+pagenumber;
    axios.get(URL).then(successCB).catch(errorCB)
}
export function postMovieReview(user_review,movie_id,successCB,errorCB){
    const config = { headers: {'Content-Type': "text/plain"} };
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+movie_id+"/review";
    axios.post(URL,user_review,config).then(successCB).catch(errorCB);
}
export function postUserRating(user_id,rating,successCB,errorCB){
    const config = { headers: {'Content-Type': 'application/json'} };
    const URL="https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+user_id+"/rating";
    axios.post(URL,rating,config).then(successCB).catch(errorCB);
}
export function getTopTenMovies(genre,successCB,errorCB){

    const URL="https://tmdbnodeapi.herokuapp.com/tmdb/movies/top-ten";
    if(genre==="All")
    {
        axios.get(URL).then(successCB).catch(errorCB);
    }
    else{
        axios.get(URL+"?genre="+genre).then(successCB).catch(errorCB);
    }
    
}