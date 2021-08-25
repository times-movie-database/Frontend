import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./MovieDetails.css";
import Rating from "react-rating";
import Header from "./Header";
import MovieReviews from "./MovieReviews";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "react-loader-spinner";
import {
  getMovieDetails,
  postMovieReview,
  postUserRating,
} from "../Services";
import {useParams } from "react-router-dom";

Modal.setAppElement("#root");
export default function MovieDetails() {
  const [loading,setLoading]=useState(false);
  const [review, setReview] = useState(false);
  const [reviewEmpty, setReviewEmpty]=useState(true);
  const [feildRequired, setFeildRequired]=useState(false);
  const [rating, setRating] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState({});
  const [movie, setMovie] = useState({});
  
  const { id } = useParams();
  const redirectToEditMovie = () => {
    window.location.href = `/movie/edit/${id}`;
  };
  useEffect(() => {
    getMovieDetails(id, (response) => {setMovie(response.data);setLoading(true);});
    
  }, [id,rating]);
 
  const handleRating = (ratingStar) => {
    setUserRating(ratingStar);
  };

  const publishRating = () => {
    const rating = userRating.toFixed(1); //setting number to fixed precision till 1 significant digit
  
    postUserRating(
      id,
      rating,
      (response) => {
        alert("Rating Added");
        setRating(false);
      },
      (error) => {
        alert("An error occurred");
        setRating(false);
        
      }
    );
  };
  let movieRating = movie.rating;        //trucncating the average rating to 1 decimal place
  if (movieRating) {
    movieRating = movieRating.toFixed(1);
  } else {
    movieRating = 0;
  }

  //Add a review to the movie
  const postReview = (event) => {
    const review = event.target.value.replace(/^ +/gm, ''); //the regex replaces intial spaces from the review text. If only spaces are provide, the review variable will be an empty string
    if(review.length >0 ){  
      setFeildRequired(false);
      setUserReview(review);
      setReviewEmpty(false);             //validation for empty user reivew
    }
    else{
        setReviewEmpty(true);          
    }
  };
  const publishReview = () => {
    setFeildRequired(true);
    if(reviewEmpty)
      return;
    postMovieReview(
      userReview,
      id,
      (response) => {
        
        setReview(false);
        setFeildRequired(false);
        alert("Review Submitted")
      },
      (error) => {
        alert("An error occurred");
        setRating(false);
      }
    );
  };
  
  return (
    
    <div>
      <ErrorBoundary>
        <Header searchBar="yes" addButton="yes" />
      </ErrorBoundary>
      {loading?(<div className="main-container">
        <div className="detail-container">
          <div className="title-and-edit-container">
            <div className="title">
              {movie.title}
            </div>
            <span className="edit">
              <button
                className="fa fa-edit edit-btn"
                onClick={redirectToEditMovie}
              ></button>
            </span>
          </div>
          <div className="genre-items">
                {movie.genres
                  ? movie.genres.map((gen,index) => (
                      <span className="tagged" key={index}>{gen.name}</span>
                    ))
                  : null}
              </div>
          <div className="rating-container">
            <div className="stars">
              <Rating
                initialRating={movie.rating}
                emptySymbol="fa fa-star"
                fullSymbol="fa fa-star checked"
                readonly={true}
                fractions={5}
              ></Rating>
              <span className="average">{movieRating}/5</span>
              <span className="count">({movie.count})</span>
            </div>

            <div className="personal-rating">
              <div className="add" onClick={() => setRating(true)}>
                <div className="rate-this-star">☆</div><div className="bold">Rate This</div>
              </div>
              <Modal
                className="popup-rating"
                isOpen={rating}
                onRequestClose={() => setRating(false)}
              >
                <div className="right-modal">
                  <button
                    className="close-btn"
                    onClick={() => setRating(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="details-title">
                  How would you like to rate this Movie?
                </div>
                <Rating
                  className="center-rating"
                  initialRating={userRating}
                  emptySymbol="fa fa-star empty"
                  fullSymbol="fa fa-star checked"
                  style={{fontSize:'2em',
                letterSpacing:'0.25em'}}
                  onChange={(rate) => handleRating(rate)}
                />
                <div className="modal-submit">
                  <button className="modal-btn" onClick={publishRating}>
                    Submit
                  </button>
                </div>
              </Modal>
            </div>
          </div>
          <div className="summary-item">
          <div className="user-reviews" style={{width:'fit-content'}}>Summary</div> 
             <div className="summary-wrap">{movie.summary}</div>
             <div className="cast-items">
              <span className="cast-title">
                Cast:</span> {movie.cast
                  ? movie.cast.map((actor,index) => (
                      <span className="tagged " key={index}>{actor.name}</span>
                    ))
                    : null}
              
            </div>  
          </div>
          
        </div>

        <div className="review-container">
          <div className="review-heading">
            <div className="personal-review">
            <div className="add" onClick={() => setReview(true)}>
              + Review
            </div>
            <Modal
              className="popup-review"
              isOpen={review}
              onRequestClose={() => setReview(false)}
            >
              <button className="close-btn" onClick={() => setReview(false)}>
                  &times;
                </button>
              <div className="right-modal">
                
              </div>
              <div className="details-title">Add your Review</div>
              <div className="center-textarea">
                <textarea
                  className="moviedetails"
                  placeholder="Write review..."
                  style={{backgroundColor:'#f7f7f7'}}              
                  onChange={postReview}
                  value={userReview.value}
                  name="userReview"
                  maxLength='500'
                ></textarea>
              </div>
              { feildRequired
              &&reviewEmpty
              &&<div style={
                { textAlign :'center',
                  paddingTop:'0.5em',
                  fontSize:'small' ,
                  color:'red'
                }}>Please write something before submitting</div>}
              <div className="modal-submit">
                <button className="modal-btn" onClick={publishReview}>
                  Submit
                </button>
              </div>
            </Modal>
          </div>
          <div className="user-reviews">User Reviews</div>
          </div>
          <div className="review-section">
            <MovieReviews id={id} className="review-section"></MovieReviews>

          </div>

          
        </div>
      </div>
):(<Loader type="Oval" color="#6D6767" height={80} width={80}  className="loader"/>)}
          </div>
  );
}
