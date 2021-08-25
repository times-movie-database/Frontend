import axios from "axios";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovieReviews } from "../Services";
import { useState, useEffect } from "react";
import "./MovieReview.css";
import Review from "./Review";
import "./Review.css";
import Loader from "react-loader-spinner";
export default function MovieReviews(props) {
  const id = props.id; //movie id
  const [movieReviews, setMovieReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  /*get movie reviews*/
  useEffect(() => {
    getMovieReviews(id, 0, (response) => setMovieReviews(response.data));
  }, []);
  /*Get movies reviews from next page*/
  const fetchreviewdata = async () => {
    const URL = await axios.get(
      "https://salty-hollows-74392.herokuapp.com/tmdb/movies/" +
        id +
        "/review?pageNumber=" +
        pageNumber
    );
    return URL.data;
  };

  const fetchMorereviews = async () => {
    const new_review = await fetchreviewdata();
    setMovieReviews([
      ...movieReviews,
      ...new_review,
    ]); /*concat new reivews with existing reviews*/
    console.log(new_review);
    if (new_review.length === 0 || new_review.length < 5) {
      setHasMore(
        false
      ); /*set hasMore to false if no reviews or fewer than 5 reivews are there on next page*/
    }

    setPageNumber(pageNumber + 1); /*increment page number*/
  };

  return (
    <div className="review-section">
      {movieReviews ? (
        <InfiniteScroll
          className={props.className}
          dataLength={movieReviews.length}
          next={fetchMorereviews}
          hasMore={hasMore}
          loader={
            <Loader
              type="Oval"
              color="#6D6767"
              height={40}
              width={40}
              className="loader"
            />
          }
          endMessage={
            <div style={{ textAlign: "center" }}>
              No more results to display
            </div>
          }
        >
          {movieReviews.map((movieReview, index) => (
            <Review timestamp={movieReview.createdAt} key={index}>
              {movieReview.review}
            </Review>
          ))}
        </InfiniteScroll>
      ) : (
        <div className="no-reviews">No reviews</div>
      )}
    </div>
  );
}
