import './MovieForm.css';
import { useState } from 'react';
import Select from 'react-select'
import { sendMovieToDB } from '../Services';

export default function MovieForm() {

    const TITLE_MAX = 100;
    const SUMMARY_MAX = 500;
    const CAST_NAME_MAX = 50;

    const initialMovieState = {
        title: "",
        summary: "",
        cast: [],
        genres: []
    }
    const [movie, setMovie] = useState(initialMovieState);

    /*cast name state*/
    const [castName, setCastName] = useState("");
    const [castNameCSV, setCastNameCSV] = useState("");

    /*error states*/
    const [titleError, setTitleError] = useState({
        fieldEmpty: true,
        limitExceeds: false
    });
    const [summaryError, setSummaryError] = useState({
        fieldEmpty: true,
        limitExceeds: false
    });

    const [castError, setCastError] = useState({
        fieldEmpty: true,
        limitExceeds: false,
        blankName: true
    });

    /*genres*/
    const genreList = [
        { id: 1, name: 'Drama' },
        { id: 2, name: 'Romance' },
        { id: 3, name: 'Sci-Fi' }
    ]

    const validateTitle = (title, value) => {
        if (value.length <= TITLE_MAX) {
            setMovie({ ...movie, [title]: value });
            setTitleError({ ...titleError, limitExceeds: false });
        }

        else {
            setTitleError({ ...titleError, limitExceeds: true });
        }

    }

    const validateSummary = (summary, value) => {
        if (value.length <= SUMMARY_MAX) {
            setMovie({ ...movie, [summary]: value });
            setTitleError({ ...summaryError, limitExceeds: false });
        }

        else {
            setTitleError({ ...summaryError, limitExceeds: true });
        }

    }

    const parseLastNameInCSV = (input) => {
        var n = input.lastIndexOf(',');
        return input.substring(n + 1);
    }

    const validateCastName = (csv) => {
        const lastChar = csv.charAt(csv.length - 1);
        const newCast = parseLastNameInCSV(csv);

        if (newCast.length > CAST_NAME_MAX) {
            setCastError({ ...castError, limitExceeds: true });
        }
        else if (lastChar !== ',') {
            setCastNameCSV(csv);
        }

        if (lastChar === ',') {
            if (castName.length > 0) {
                setCastNameCSV(csv);
            }
            else {
                console.log("cast name can't be blank");
                setCastError({ ...castError, blankName: true });
            }
        }
        setCastName(newCast);
    }

    const handleFeildChange = (event) => {
        switch (event.target.name) {
            case 'title': validateTitle(event.target.name, event.target.value);
                break;
            case 'summary': validateSummary(event.target.name, event.target.value);
                break;
            case 'cast': validateCastName(event.target.value);
                break;
            default: console.log("Default Case");
        }
    }

    const handleDropdownChange = (e) => {
        setMovie({ ...movie, genres: e });
    }

    const createCastList = () => {
        setMovie(
            () => {
                return{
                    cast : castNameCSV.split(',')
                };
            }
        )
    }

    const handleSubmit = () => {
        createCastList();
        sendMovieToDB(
            movie,
            () => (alert("Success")),
            (error) => {
                alert(`Error ${error}`);
            }
        );
        console.log(movie.cast);

    }

    return (
        <div className='movie-form'>
            <form>
                <ul className='container'>
                    <li>
                        <input name='title' type='text' placeholder='Movie Title' value={movie.title} onChange={handleFeildChange}></input><br />
                    </li>
                    <li>
                        <textarea name='summary' rows='15' cols='20' placeholder='Summary' value={movie.summary} className='form-control' onChange={handleFeildChange}></textarea ><br />
                    </li>
                    <li>
                        <input name='cast' type='text' placeholder='Cast' value={castNameCSV} onChange={handleFeildChange}></input><br />
                    </li>
                    <li>
                        <Select name='genres' isMulti getOptionLabel={option => option.name} getOptionValue={option => option.id} options={genreList} onChange={handleDropdownChange} /><br />
                    </li>
                    <li>
                        <button type='submit' onClick={handleSubmit}>Submit</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}