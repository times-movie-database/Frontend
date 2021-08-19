import { useState, useEffect } from "react";
import "./AddReview.css";
import Modal from "react-modal";
import AddRating from "./AddRating";
import Review from "./Review";
import "./MovieDetails1.css";
import Rating from "react-rating";
import { getMovieDetails, getMovieReviews,postMovieReview } from "../Services";
import { useLocation, useParams } from "react-router-dom";
Modal.setAppElement("#root");
export default function MovieDetails(props) {
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const [userRating, setUserRating] = useState([]);
  const [userReview, setUserReview] = useState({});
  const [movie, setMovie] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const redirectToEditMovie = () => {
    window.location.href = `/movie/edit/${id}`;
  };

  useEffect(() => {
    getMovieDetails(id, (response) => setMovie(response.data));
  }, id);
  // useEffect(()=>
  // {
  //   postUserRating(id,response=>{console.log(response.data)})
  // })
  useEffect(() => {
    getMovieReviews(id, (response) => setMovieReviews(response.data));
  });
  let movieRating = movie.rating;
  if (movieRating) {
    movieRating = movieRating.toFixed(1);
  } else {
    movieRating = 0;
  }
  //Add a review to the movie
  const postReview=(event)=>{
    const string=event.target.value
    setUserReview(string)
  }
  const publishReview=()=>{
    console.log(userReview)
    postMovieReview(userReview,id,response=>{console.log(response.data)});
  }
  return (
    <div className="main-container">
      <div className="detail-container">
        <div className="title-and-edit-container">
          <div className="title">
            {movie.title}

            <div className="genre-items">
              <span className="tagged">Action</span>
              <span className="tagged">Sci-fi</span>
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
              fractions={10}
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
                <button className="close-btn" onClick={() => setRating(false)}>
                  &times;
                </button>
              </div>
              <div className="details-title">
                How would you like to rate this Movie?
              </div>

              <AddRating></AddRating>
              <div className="modal-submit">
                <button className="modal-btn">Sumbit</button>
              </div>
            </Modal>
          </div>
        </div>

        <div className="summary-item">
          Summary : {movie.summary}
          <div className="cast-items">
            <div className="cast-title">
              Cast:<span className="tagged">ABC</span>
              <span className="tagged">ABC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="review-container">
        <div className="review-heading">
          <button className="user-reviews">User Reviews</button>
        </div>
        <div className="review-section">
          {movieReviews.map((movieReview, index) => (
            <Review timestamp={movieReview.createdAt}>
              {movieReview.review}
            </Review>
          ))}
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
              <button className="modal-btn" onClick={publishReview}>Sumbit</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
