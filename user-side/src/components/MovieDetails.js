import { useState, useEffect } from "react";
import "./AddReview.css";
import Modal from "react-modal";
import AddRating from "./AddRating";
import Review from "./Review";
import "./MovieDetails1.css";
import Rating from "react-rating";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";
import {
  getMovieDetails,
  getMovieReviews,
  postMovieReview,
  postUserRating,
} from "../Services";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

Modal.setAppElement("#root");
export default function MovieDetails(props) {
  const [review, setReview] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [rating, setRating] = useState(false);
  const [userRating, setUserRating] = useState(1);
  const [userReview, setUserReview] = useState({});
  const [movie, setMovie] = useState({});
  const [movieReviews, setMovieReviews] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const redirectToEditMovie = () => {
    window.location.href = `/movie/edit/${id}`;
  };
  useEffect(() => {
    getMovieDetails(id, (response) => setMovie(response.data));
  }, id);
  useEffect(() => {
    getMovieReviews(id, pageNumber, (response) =>
      setMovieReviews(response.data)
    );
  });

  const handleRating = (ratingStar) => {
    setUserRating(ratingStar);
  };

  const publishRating = () => {
    const r = { userRating };
    console.log(r);
    console.log(typeof r.userRating);
    postUserRating(
      id,
      r.userRating,
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };
  let movieRating = movie.rating;
  if (movieRating) {
    movieRating = movieRating.toFixed(1);
  } else {
    movieRating = 0;
  }

  //Add a review to the movie
  const postReview = (event) => {
    const string = event.target.value;
    setUserReview(string);
  };
  const publishReview = () => {
    console.log(userReview);
    console.log(typeof userReview);
    postMovieReview(
      userReview,
      id,
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };
  useEffect(() => {
    getMovieReviews(id, pageNumber, (response) =>
      setMovieReviews(response.data)
    );
  }, [userReview]);
  const getReviews = () => {};
  return (
    <div>
      <ErrorBoundary>
        <Header searchBar="yes" addButton="yes" />
      </ErrorBoundary>
      <div className="main-container">
        <div className="detail-container">
          <div className="title-and-edit-container">
            <div className="title">
              {movie.title}
              <div className="genre-items">
                {movie.genres
                  ? movie.genres.map((gen) => (
                      <span className="tagged">{gen.name}</span>
                    ))
                  : null}
              </div>
            </div>
            <span className="edit">
              <button
                className="fa fa-edit edit-btn"
                onClick={redirectToEditMovie}
              ></button>
            </span>
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
              <span className="average">{movieRating}</span>
              <span className="count">({movie.count})</span>
            </div>

            <div className="personal-rating">
              <div className="add" onClick={() => setRating(true)}>
                <div className="rate-this-star">☆</div>Rate This
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
                  initialRating={userRating}
                  emptySymbol="fa fa-star"
                  fullSymbol="fa fa-star checked"
                  onChange={(rate) => handleRating(rate)}
                />
                <div className="modal-submit">
                  <button className="modal-btn" onClick={publishRating}>
                    Sumbit
                  </button>
                </div>
              </Modal>
            </div>
          </div>

          <div className="summary-item">
            Summary : {movie.summary}
            <div className="cast-items">
              <div className="cast-title">
                Cast:
                {movie.cast
                  ? movie.cast.map((actor) => (
                      <span className="tagged ">{actor.name}</span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>

        <div className="review-container">
          <div className="review-heading">
            <button className="user-reviews">User Reviews</button>
          </div>
          <div className="review-section">
            {movieReviews ? (
              <InfiniteScroll
                dataLength={5}
                next={()=>setPageNumber(pageNumber+1)}
                hasMore={true}
                loader={<h4>Loading....</h4>}
                endMessage={<div>No more results to display</div>}
              >
                {movieReviews.map((movieReview, index) => (
                  <Review timestamp={movieReview.createdAt}>
                    {movieReview.review}
                  </Review>
                ))}
              </InfiniteScroll>
            ) : (
              "No reviews"
            )}
          </div>

          <div className="personal-review">
            <div className="add" onClick={() => setReview(true)}>
              + Review
            </div>
            <Modal
              className="popup-review"
              isOpen={review}
              onRequestClose={() => setReview(false)}
            >
              <div className="right-modal">
                <button className="close-btn" onClick={() => setReview(false)}>
                  &times;
                </button>
              </div>
              <div className="details-title">Add your Review</div>
              <div className="center-textarea">
                <textarea
                  className="moviedetails"
                  placeholder="Write review..."
                  onChange={postReview}
                  value={userReview.value}
                  name="userReview"
                ></textarea>
              </div>
              <div className="modal-submit">
                <button className="modal-btn" onClick={publishReview}>
                  Sumbit
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
