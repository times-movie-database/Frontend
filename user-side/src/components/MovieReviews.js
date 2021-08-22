import axios from 'axios';
import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovieReviews } from '../Services';
import { useState,useEffect } from 'react';
import './MovieReview.css';
import Review from './Review';
import './Review.css';
export default function MovieReviews(props) {
    const id=props.id;
    const [movieReviews, setMovieReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore,setHasMore]=useState(true);
  useEffect(() => {
    getMovieReviews(id, 0, (response) =>
      setMovieReviews(response.data)
    );
  },[]);
  
  const fetchreviewdata=async ()=>{
    const URL=await axios.get("https://salty-hollows-74392.herokuapp.com/tmdb/movies/"+id+"/review?pageNumber="+pageNumber)
    return URL.data;
  }
  const fetchMorereviews=async ()=>
  {
    const new_review=await fetchreviewdata();
    setMovieReviews([...movieReviews,...new_review]);
    console.log(new_review);
    if (new_review.length===0 || new_review.length<5){
        setHasMore(false)
      }
      
      setPageNumber(pageNumber+1) 
  }
  
  return (
        <div className="review-section">
            {movieReviews ? (
              <InfiniteScroll className={props.className}
                dataLength={movieReviews.length}
                next={fetchMorereviews}
                hasMore={hasMore}
                loader={<h4>Loading....</h4>}
                endMessage={<div>No more results to display</div>}
              >
                {movieReviews.map((movieReview, index) => (
                  <Review timestamp={movieReview.createdAt}>
                    {movieReview.review}
                  </Review>
                ))}
              </InfiniteScroll>
             ) : 
              <div className="no-reviews">No reviews</div>
}
        </div>
    )
}
