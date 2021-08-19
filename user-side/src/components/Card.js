import "./Card.css";
import Rating from "react-rating";
import { Link } from "react-router-dom";
export default function Card(props) {
  return (
    <Link to={{pathname:`/movie/${props.id}`}} style={{ "textDecoration": "none" }}>
    <div className={props.className}>
      <div className="sno">{props.count}</div>
      <div className="card-title">
        <h2>{props.title}</h2>
      </div>
      <div className="card-rating">
        <Rating
          initialRating={props.rating}
          emptySymbol="fa fa-star"
          fullSymbol="fa fa-star checked"
          readonly={true}
          fractions={10}
        ></Rating>{" "}
        
      </div>
    </div>
    </Link>
  );
}
