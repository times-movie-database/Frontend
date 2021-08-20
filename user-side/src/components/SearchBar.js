import { useState } from "react";
import './SearchBar.css'
import { Link } from "react-router-dom";
export default function SearchBar() {
    const [keyword, setKeyword] = useState([]);
    const handleKeyword = (event) => {
        setKeyword(event.target.value);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        if(!keyword)
        {
          alert("Enter movie name");
            //searchMovie("",0).then(res=>{setSearchResult(res.data)})
          //console.log(searchResult);
          // window.location.href = "/search/keyword";
    
        }
        
      }
    return (
        <div className='search-bar'>
            <input
              name="search"
              type="text"
              id="form1"
              value={keyword.value}
              placeholder="Search..."
              onChange={handleKeyword}
            />
            
            
            <Link to={{pathname:"/search/"+keyword,state:{searchKeyword:keyword}}} style={{ "textDecoration": "none" }}>
            <button className="btn">
              <i className="fa fa-search"></i>
            </button>
            </Link>           
        </div>
    )
}
