import "./Card.css";
export default function Card(props) {
  return (
    <div className={props.className}>
      <div className="sno">{props.count}</div>
      <div className="card-title">
        <h2>{props.title}</h2>
      </div>
      <div className="card-rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>
    </div>
  );
}
