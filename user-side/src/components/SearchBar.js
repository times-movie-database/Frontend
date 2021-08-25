import { useEffect, useState } from "react";
import './SearchBar.css'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
export default function SearchBar() {
  
  const initialPlaceholder = () => {
    return  window.innerWidth>=768?"Search through movie title or keywords...": "Search...";
  }
  const [keyword, setKeyword] = useState([]);
  const [placeholder,setPlaceHolder]=useState(initialPlaceholder())
  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    const str = keyword;
    setKeyword(str.toString().replace(/^ +/gm, '')); //this replaces the spaces in beggining with empty string
  }, [keyword]);

  const isKeyWordValid = () => {
    return keyword.length === 0 ? false : true;    //check for empty keyword
  }
  function debounce(fn, ms) {               //update placeholder based screen size
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }
  // render placeholder based in screen size
  useEffect(() => {
    const debouncedHandleResize = debounce(function  updateSearchBarPlaceHolder(){        
      const newPlaceHoder= window.innerWidth>=768?"Search through movie title or keywords...": "Search...";
      setPlaceHolder( newPlaceHoder );
    }, 200)

    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
}})
 

  return (
    <div className='search-bar'>
      <input
        name="search"
        type="text"
        id="form1"
        value={keyword}
        placeholder={placeholder}
        onChange={handleKeyword}
        maxLength='100'
      />
      {/*if keyword is invalid error tooltip is displayed*/ }
      {!isKeyWordValid() &&
        
        <Popup  trigger={<button className="btn">
        <i className="fa fa-search"></i>
      </button>} position="right center">
        <div className='error-tooltip'>Enter a keyword to search!!</div>  
      </Popup>
      }
      {/* if keyword is valid component is routed to search screen8*/ }
      {isKeyWordValid() &&
        <Link to={{ pathname: "/search/" + keyword, state: { searchKeyword: keyword } }} style={{ "textDecoration": "none" }}>
          <button className="btn">
            <i className="fa fa-search"></i>
          </button>
        </Link>
      }
    </div>
  )
}
