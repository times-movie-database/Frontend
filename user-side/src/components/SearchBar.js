import { useState } from "react";
import './SearchBar.css'
export default function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const handleKeyword = (event) => {
        setKeyword({keyword,[event.target.name]: event.target.value});
      };
      console.log(keyword);
      const handleSubmit = (event) => {
        event.preventDefault();
        
        if(keyword)
        {
          //searchMovie("",0).then(res=>{setSearchResult(res.data)})
          //console.log(searchResult);
          // window.location.href = "/search/keyword";
    
        }
        else{
          alert("select either a movie name or genre");
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
            <button className="btn" onClick={handleSubmit}>
              <i className="fa fa-search"></i>
            </button>            
        </div>
    )
}
