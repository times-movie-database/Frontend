import React from "react";
import Rating from "react-rating";
export default function AddRating() {
 
  const ratingHandler=(rating)=>{
      console.log(rating);
      alert(rating);
  }
    return (
    <div>
      <Rating
        initialRating='0'
        emptySymbol="fa fa-star"
        fullSymbol="fa fa-star checked"
        onChange={rate=>ratingHandler(rate)}
      />
    </div>
  );
}
