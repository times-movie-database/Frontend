import './Header.css';
import logo from './images/placeholder.png';
export default function Header(props) {
    return (
        <div className="header background">
 
            <div className="container1">
                <img src={logo} alt="Logo" />
               
                    {props.searchBar === "yes" ? (
                        <div className='container2'>
                            <input type="text" id="form1" placeholder="Search..." />
                            <select>
                                <option>Genre</option>
                                <option>All</option>
                            </select>
                            <button type="submit" className="btn"><i className="fa fa-search"></i></button>
                        </div>
                    ) : null}
                    
                    {props.addButton === "yes" ? (
                        <button className="add-movie">Add a Movie</button>
                    ) : null}
 
            </div>
 
        </div>
    )
}
