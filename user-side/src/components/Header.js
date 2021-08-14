import "./Header.css";
import logo from "./images/logo.png";
import { useState } from "react";
<<<<<<< HEAD

=======
>>>>>>> 48b27d5dd5d43e18231157b46749585ea46d2528
export default function Header(props) {
  const redirectToAddMovie = () => {
    window.location.href = "/movie/add";
  };
  const redirectToHomeScreen=()=>{
    window.location.href = "/";
  }
  const [keyword,setKeyword]=useState('');

  const searchHandler=(event)=>{
        setKeyword(event.target.value);
  };
  const submitHandler=(event)=>{
        
        window.location.href='/search/keyword';
  };
  return (
    
    <div className="header background">
      <div className="container1">
        <img src={logo} alt="Logo" onClick={redirectToHomeScreen} className="header img" />

        {props.searchBar === "yes" ? (
          <div className="container2">
            <input type="text" id="form1" value={keyword} placeholder="Search..." onChange={searchHandler} />
            <select className="slt">
              <option className="opt">Genre</option>
              <option className="opt">All</option>
            </select>
            <button className="btn" onClick={submitHandler}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        ) : null}

        {props.addButton === "yes" ? (
          <button className="add-movie" onClick={redirectToAddMovie}>
            Add a Movie
          </button>
        ) : null}
      </div>
    </div>
  );
}
