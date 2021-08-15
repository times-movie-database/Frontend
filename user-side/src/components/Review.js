import React from "react";
import "./Review.css";
import { useState } from "react";
export default function Review(props) {
  const text = props.children;
  const [Readmore, setReadmore] = useState(true);
  const toggleReadmore = () => {
    setReadmore(!Readmore);
  };
  return (
    <div className="review">
      <div className="timestamp">
        19-02-1998
        <br/>
        <br/>
      </div>
      <div className="content">
        {Readmore ? text.slice(0,150) : text}
        <span onClick={toggleReadmore} className="read-more">
          {Readmore ? "...read more" : " Show Less"}
        </span>
      </div>
    </div>
  );
}
