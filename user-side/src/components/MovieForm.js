import './MovieForm.css';
import { useState } from 'react';
export default function MovieForm() {
    const initialState = {
        title: "",
        summary: "",
        cast: [],
        genres: []
    }
    const [movie, setMovie] = useState(initialState)
    const validateTitle=(title,value)=>{
        if(value.length<50)
            setMovie({...movie,[title]:value});
        else
         return;
    }
    const handleFeildChange = (event) => {
        switch (event.target.name) {
            case 'title': validateTitle(event.target.name,event.target.value);
                         console.log(event.target.value)
                          break;
            case 'summary': console.log(event.target.value)
                            break;
            case 'cast': console.log(event.target.value)
                         break;
            case 'genres': console.log(event.target.value)
                           break;
        }
    }
    const handleSubmit = () => {
        alert("sent");
    }
    return (
        <div>
            <form>
                <ul className='container'>
                    <li>
                        <input type='text' placeholder='Movie Title' maxLength='50'></input><br />
                    </li>
                    <li>
                        <textarea name='summary' rows='15' cols='20' placeholder='Summary' value={movie.summary} className='form-control' onChange={handleFeildChange}></textarea ><br />
                    </li>
                    <li>
                        <input name='cast' type='text' placeholder='Cast' value={movie.cast}onChange={handleFeildChange}></input><br />
                    </li>
                    <li>
                        <input name='genres' type='text' placeholder='Genre' value={movie.genres} onChange={handleFeildChange}></input><br />
                    </li>
                    <li>
                        <button type='submit' onClick={handleSubmit}>Submit</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}