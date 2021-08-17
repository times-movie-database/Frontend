import "./Header.css";
import logo from "./images/logo.png";
import { useState,useEffect } from "react";
import { getAllGenre} from '../Services';
export default function Header(props) {
  const [values, setValues] = useState({keyword:'',genre:[]});
  const [genreList,setGenreList]=useState([])
  const [errors, setErrors] = useState({ fieldsEmpty: true });
  const handleError=(values)=>{
    let errors=[];
    if(!values.keyword.trim() && values.genre==='Genre'){
      errors="Enter either a movie name or select a genre";
    }
    return errors;
  }

  /*get genre list from server*/
  useEffect(()=>{
    getAllGenre().then((res) => {
      setGenreList(res.data)
      console.log(genreList);
  })
  })
  

  const handleChange = (event) => {
    setValues({[event.target.name]: event.target.value});
  };
  const redirectToAddMovie = () => {
    window.location.href = "/movie/add";
  };
  const redirectToHomeScreen = () => {
    window.location.href = "/";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(handleError(values));
    window.location.href = "/search/keyword";
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
              value={values.keyword}
              placeholder="Search..."
              onChange={handleChange}
            />
            <select
              name="genre"
              className="slt"
              // value={values.genre}
              // onChange={handleChange}
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
