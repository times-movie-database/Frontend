import './MovieForm.css';
import { useEffect, useState } from 'react';
import { useRef } from "react";
import Select from 'react-select'
import { getAllGenre, getMovieDetails, sendMovieToDB, updateMovieInDB } from '../Services';
import { useParams } from 'react-router-dom';

export default function MovieForm(props) {

    const TITLE_MAX = 100;
    const SUMMARY_MAX = 500;
    const CAST_NAME_MAX = 50;
    const dropdownSelectInputRef = useRef();
    const [initialGenre, setInitialGenre] = useState([]); //to keep genre data in drop down
    //id stores movie id, accessed via parameter of edit url
    const { id } = useParams();

    /* last cast name parsed from CSV state*/
    const [castName, setCastName] = useState("");
    /*comma separated cast name in the cast feild state*/
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
        consecutiveCommas: false
    });

    const [genreError, setGenreError] = useState({
        fieldEmpty: true
    });

    const [inValidName, setInValidName] = useState(false);
    const [feildRequired, setFeildRequired] = useState(false);
    /*genres*/
    const [genreList, setGenreList] = useState([])

    /*movie state*/

    const initialMovieState = {   //to keep intial state of form
        title: "",
        summary: "",
        genreIdList: []
    };
    const [movie, setMovie] = useState(initialMovieState);

  /*function to capitalise the first letter in the drop down menu*/
    function capitaliseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getCsvFromArray = (array) => {
        let csv = "";
        for (let i = 0; i < array.length - 1; i++) {
            csv += array[i] + ', '
        }
        csv += array[array.length - 1] + " ";
        return csv;
    }
    const parseLastNameInCSV = (input) => {
        var n = input.lastIndexOf(',');
        return input.substring(n + 1);
    }


    let formHeading; //to keep heading of the form
    useEffect(() => {

        if (props.isEdit) {
            //if the form is edit form, fill it with the movie details
            getMovieDetails(id, (response) => {
                /*Heading of the form to Edit movie*/
                formHeading = "Edit Movie";

                const movieDetail = response.data;
                const movieNewState = {
                    title: capitaliseFirstLetter(movieDetail.title),
                    summary: movieDetail.summary,
                    genreIdList: movieDetail.genres.map((genre) => {
                        return genre.id
                    })
                }
                setMovie(movieNewState);
                if (movieDetail.title) {
                    setTitleError({ ...titleError, fieldEmpty: false })
                }

                const castArray = movieDetail.cast.map((cast) => {
                    return cast.name
                })
                const castCSV = getCsvFromArray(castArray);

                if (castCSV.length > 0) {
                    setCastError({ ...castError, consecutiveCommas: false });
                    setCastName(parseLastNameInCSV(castCSV).replace(/^ +/gm, ''));
                }
                setCastNameCSV(castCSV);
                setInitialGenre(movieDetail.genres);
            })
        }
        else {

        }
    }, []);

    //updates the value of dropsown as soon as it detects a change in state of initial genre
    useEffect(() => {
        dropdownSelectInputRef.current.select.setValue(initialGenre);
    }, [initialGenre])

    if (props.isEdit) {
        formHeading = "Edit Movie Details";
    }
    else {
        formHeading = "Add a Movie";
    }

    /*get genre list from server*/
    if (genreList.length === 0) {
        getAllGenre().then((res) => {
            setGenreList(res.data);
        })
    }


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



    const isValidCharacter = (character) => {
        const regex = /^[,a-zA-Z ]/;
        return regex.test(character);
    }

    const validateCastName = (csvInput) => {
        const csv = csvInput.toString().replace(/^ +/gm, ''); //to terminate spaces in the starting of CSV in feilds
        const lastChar = csv.charAt(csv.length - 1);
        const newCast = parseLastNameInCSV(csv).replace(/^ +/gm, ''); // to terminate spaces in the starting of individual cast naem
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
            (isValidCharacter(lastChar) || lastChar === '') && (newCast.length > 0 || csv.length === 0)) {
            setCastNameCSV(csv);
            setCastError({ ...castError, limitExceeds: false });
            setCastError({ ...castError, consecutiveCommas: false });
        }

        if (lastChar === ',') {
            if (castName.length > 0) {
                setCastNameCSV(csv);
                setCastError({ ...castError, consecutiveCommas: false });
            }
            else {
                setCastError({ ...castError, consecutiveCommas: true }); //throws error on two consecutive commas
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
        const genreIDs = e.map((genre) => {
            return genre.id;
        })
        setMovie({ ...movie, genreIdList: genreIDs });
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
            input => (input.value = ""));
        dropdownSelectInputRef.current.select.clearValue();

        /*reset error properties for each feild*/
        setTitleError({ ...titleError, fieldEmpty: true });
        setCastError({ ...castError, fieldEmpty: true });
        setSummaryError({ ...summaryError, fieldEmpty: true });
        setGenreError({ ...genreError, fieldEmpty: true });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (titleError.fieldEmpty || genreError.fieldEmpty || castNameCSV.length === 0) {
            setFeildRequired(true);
        }
        else {
            const movieDetails = {
                title: movie.title,
                summary: movie.summary,
                castList: castNameCSV.split(','),
                genreIdList: movie.genreIdList
            };
            setFeildRequired(false);
            if (props.isEdit) {
                updateMovieInDB(
                    id,
                    movieDetails,
                    (res) => {
                        alert('Movie Detail Updated');
                        setTimeout(() => {
                            window.location.href = `/movie/${id}`;
                        }, 2000);
                    },
                    (error) => {
                        alert(error);
                    })
            }
            else {
                sendMovieToDB(
                    movieDetails,
                    (res) => {
                        alert("Movie details saved successfully");
                        console.log(res.data);
                        handleReset();
                    },
                    (error) => {
                        alert(`${error}`);
                    }
                );
            }

        }

    }

    return (
        <div className='movie-form' id='container'>
            <div className='form-wrap'>
                <h1>{formHeading}</h1>
                <form>

                    <div className='form-group'>
                        <label htmlFor='title' name='title'>
                            Movie Title <span className="required">*</span>
                        </label>
                        <input name='title' id='title' type='text' placeholder='Enter here' value={movie.title} onChange={handleFeildChange}></input><br />
                    </div>
                    {titleError.limitExceeds ? <div className='warning'>Movie title should not be more than 100 characters</div> : null}
                    {(titleError.fieldEmpty && feildRequired) ? <div className='warning shake-text'>Movie title cannot be empty</div> : null}


                    <div className='form-group'>
                        <label for='summary' name='plot'>
                            Plot
                        </label>
                        <textarea name='summary' id='summary' rows='15' cols='20' placeholder='Enter here' value={movie.summary} className='form-control' onChange={handleFeildChange}></textarea ><br />
                    </div>
                    {summaryError.limitExceeds ? <div className='warning'>Try to keep summary crisp. Can't be more than 500 characters long. </div> : null}

                    <div className='form-group'>
                        <label for='cast' name='cast-csv'>
                            Casts <span className="required">*</span>
                        </label>
                        <input name='cast' id='cast' type='text' placeholder='Enter comma separated names here' value={castNameCSV} onChange={handleFeildChange}></input><br />
                    </div>
                    {inValidName ? <div className='warning'>Names should not contain any number or special character</div> : null}
                    {castError.limitExceeds ? <div className='warning'>Cast name should not be more than 50 characters</div> : null}
                    {(castNameCSV.length === 0 && feildRequired) ? <div className='warning shake-text'>Movie cast cannot be empty</div> : null}
                    {castError.consecutiveCommas ? <div className='warning'>Please add a valid name between two commas</div> : null}

                    <div className='form-group'>
                        <label for='genres' name='genre-dropdown'>
                            Genres
                        </label>
                        <span className="required">*</span>
                        <Select name='genres' id='genres' isMulti
                            ref={dropdownSelectInputRef}
                            placeholder='Choose relavant genres'
                            defaultValue={initialGenre}
                            getOptionLabel={option => capitaliseFirstLetter(option.name)}
                            getOptionValue={option => option.id}
                            options={genreList}
                            onChange={handleDropdownChange} /><br />
                    </div>
                    {(genreError.fieldEmpty && feildRequired) ? <div className='warning shake-text'>Please select atleast one genre</div> : null}
                    <div className='btn-center'>
                        <button type='submit' onClick={handleSubmit} className='btn'>Save</button>
                    </div>

                    <p className={(feildRequired) ? " bottom-text shake-text" : "bottom-text"}>
                        <strong>Note: </strong> <span className="required">*</span> marked feilds are required
                    </p>
                </form>

            </div>
        </div>
    );
}