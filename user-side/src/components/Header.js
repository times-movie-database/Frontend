import "./Header.css";
import logo from "./images/logo.png";
import SearchBar from "./SearchBar";
export default function Header(props) {
  const redirectToAddMovie = () => {
    window.location.href = "/movie/add";
  };
  const redirectToHomeScreen = () => {
    window.location.href = "/";
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
            <SearchBar></SearchBar>
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
