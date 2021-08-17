import "./Header.css";
import logo from "./images/logo.png";
import { useState,useEffect } from "react";
import { getAllGenre,searchMovie} from '../Services';
import React from "react";
export default function Header(props) {
  const [keyword, setKeyword] = useState('');
  const [genreList,setGenreList]=useState([])
  const [genre,setGenre]=useState([]);
  const [searchResult,setSearchResult]=useState([]);
  let err='';

  /*get genre list from server*/
  if(genreList.length===0){
    getAllGenre().then((res) => {
        setGenreList(res.data);
    })
}
  

  const handleKeyword = (event) => {
    setKeyword({keyword,[event.target.name]: event.target.value});
  };
  console.log(keyword);
  const handleGenre=(event)=>{
     setGenre({genre,[event.target.name]: event.target.value});
  }
  console.log(genre);

  const redirectToAddMovie = () => {
    window.location.href = "/movie/add";
  };
  const redirectToHomeScreen = () => {
    searchMovie("",0).then(res=>{setSearchResult(res.data)})
    console.log(searchResult);
    // window.location.href = "/";
  };
   
  const handleSubmit = (event) => {
    event.preventDefault();
    if(keyword && genre)
    {
      window.location.href = "/search/keyword";

    }
    else{
      alert("select either a movie name or genre");
    }
  };
  return (
    <div className="header background">
      <div className="container-outer">
        <img
          src={logo}
          alt="Logo"
          onClick={redirectToHomeScreen}
          className="header img"
        />

        {props.searchBar === "yes" ? (
          <div className="container-inner">
            <input
              name="search"
              type="text"
              id="form1"
              value={keyword.value}
              placeholder="Search..."
              onChange={handleKeyword}
            />
            <select
              name="genre"
              className="slt"
              value={genre.value}
              onChange={handleGenre}
            >
              <option defaultValue>Genre</option>
              {genreList.map((genre)=><option className="opt" key={genre.id} value={genre.id}>{genre.name}</option>)}
            </select>
            <button className="btn" onClick={handleSubmit}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        ) : null}

        {props.addButton === "yes" ? (
          <div className="add-movie" onClick={redirectToAddMovie}>
            <div className="add-symbol">+</div>
            <div className="add-text">Add a movie </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
