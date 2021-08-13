import './MovieForm.css';
import { useState } from 'react';
import { useRef } from "react";
import Select from 'react-select'
import { getAllGenre, sendMovieToDB } from '../Services';

export default function MovieForm() {

    const TITLE_MAX = 100;
    const SUMMARY_MAX = 500;
    const CAST_NAME_MAX = 50;
    const dropdownSelectInputRef = useRef();
    const initialMovieState = {
        title: "",
        summary: "",
        genreIdList: []
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

    const [genreError, setGenreError] = useState({
        fieldEmpty: true
    });

    const [inValidName, setInValidName] = useState(false);
    const [feildRequired, setFeildRequired] = useState(false);
    /*genres*/
    const [genreList, setGenreList] =useState([])
    
    /*get genre list from server*/
    getAllGenre().then( (res) => {
        setGenreList(res.data)
        console.log(genreList);
    })

    const validateTitle = (title, value) => {
        /*To check if max allowed lenght reached*/
        if (value.length <= TITLE_MAX) {
            setMovie({ ...movie, [title]: value });
            setTitleError({ ...titleError, limitExceeds: false });
        }
        else {
            setTitleError({ ...titleError, limitExceeds: true });
        }
        /*If the feild is empty*/
        if (value.length === 0) {
            setTitleError({ ...titleError, fieldEmpty: true });
        }
        else {
            setTitleError({ ...titleError, fieldEmpty: false })
        }


    }

    const validateSummary = (summary, value) => {
        if (value.length <= SUMMARY_MAX) {
            setMovie({ ...movie, [summary]: value });
            setSummaryError({ ...summaryError, limitExceeds: false });
        }

        else {
            setSummaryError({ ...summaryError, limitExceeds: true });
        }

    }

    const parseLastNameInCSV = (input) => {
        var n = input.lastIndexOf(',');
        return input.substring(n + 1);
    }

    const isValidCharacter = (character) => {
        const regex = /^[,a-zA-Z ]/;
        return regex.test(character);
    }
   
    const validateCastName = (csv) => {
        const lastChar = csv.charAt(csv.length - 1);
        const newCast = parseLastNameInCSV(csv);

        /*Check whether last character inputed is valid or not  */
        if (lastChar !== '' &&
            !isValidCharacter(lastChar)) {
            setInValidName(true);
        }
        else {
            setInValidName(false);
        }

        if (newCast.length > CAST_NAME_MAX) {
            setCastError({ ...castError, limitExceeds: true });
        }
        else if (lastChar !== ',' &&
            (isValidCharacter(lastChar) || lastChar === '')) {
            setCastNameCSV(csv);
            setCastError({ ...castError, limitExceeds: false });
        }

        if (lastChar === ',') {
            if (castName.length > 0) {
                setCastNameCSV(csv);
                setCastError({ ...castError, blankName: false });
            }
            else {
                console.log("cast name shouldn't be blank");
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
        /*e is array of genre object*/
        const genreID = e.map((genre) => {
            return genre.id;
        })
        setMovie({ ...movie, genreIdList: genreID });
        if (e.length > 0) {
            setGenreError({ ...genreError, fieldEmpty: false });
        }
        else {
            setGenreError({ ...genreError, fieldEmpty: true });
        }
    }

    const handleReset = () => {
        /*Reset movie form state*/
        setMovie(initialMovieState);
        setCastNameCSV("");

        /*Reset every feild*/
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "") );
        dropdownSelectInputRef.current.select.clearValue();

        /*reset error properties for each feild*/
        setTitleError( { ...titleError, fieldEmpty:true } );
        setCastError( { ...castError, fieldEmpty:true } );
        setSummaryError( { ...summaryError, fieldEmpty:true } );
        setGenreError( { ...genreError, fieldEmpty:true } );
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (titleError.fieldEmpty || genreError.fieldEmpty) {
            setFeildRequired(true);
        }
        else {
            const movieDetails = {
                title: movie.title,
                summary: movie.summary,
                casteList: castNameCSV.split(','),
                genreIdList: movie.genreIdList
            };
            setFeildRequired(false);
            sendMovieToDB(
                movieDetails,
                (res) => {
                    alert("Success");
                    console.log(res.data);
                    handleReset();
                },
                (error) => {
                    alert(`Error ${error}`);
                }
            );
        }

    }

    return (
        <div className='movie-form' id='container'>
            <div className='form-wrap'>
                <h1>Add a Movie</h1>
                <form>

                    <div className='form-group'>
                        <span className="required">*</span>
                        <input name='title' id='title' type='text' placeholder='Movie Title' value={movie.title} onChange={handleFeildChange}></input><br />
                    </div>
                    {titleError.limitExceeds ? <div className='warning'>Movie title should not be more than 100 characters</div> : null}
                    {(titleError.fieldEmpty && feildRequired) ? <div className='warning shake-text'>Movie title cannot be blank</div> : null}


                    <div className='form-group'>
                        <textarea name='summary' id='summary' rows='15' cols='20' placeholder='Summary' value={movie.summary} className='form-control' onChange={handleFeildChange}></textarea ><br />
                    </div>
                    {summaryError.limitExceeds ? <div className='warning'>Try to keep summary crisp. Can't be more than 500 characters long. </div> : null}

                    <div className='form-group'>
                        <input name='cast' id='cast' type='text' placeholder='Cast' value={castNameCSV} onChange={handleFeildChange}></input><br />
                    </div>
                    {inValidName ? <div className='warning'>Names should not contain any number or special character</div> : null}
                    {castError.limitExceeds ? <div className='warning'>Name should not be more than 50 characters</div> : null}

                    <div className='form-group'>
                        <span className="required">*</span>
                        <Select name='genres' id='genres' isMulti
                            ref = { dropdownSelectInputRef }
                            placeholder='Choose Genres'
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            options={genreList}
                            onChange={handleDropdownChange} /><br />
                    </div>
                    {(genreError.fieldEmpty && feildRequired) ? <div className='warning shake-text'>Please select atleast one genre</div> : null}
                    <div className='btn-center'>
                        <button type='submit' onClick={handleSubmit} className='btn'>Submit</button>
                    </div>

                    <p className={(feildRequired) ? " bottom-text shake-text" : "bottom-text"}>
                        <strong>Note: </strong> <span className="required">*</span> marked feilds are required
                    </p>
                </form>

            </div>
        </div>
    );
}