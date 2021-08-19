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
    const [intialGenre, setInitialGenre] = useState([]); //to keep genre data in drop down
    //id stores movie id, accessed via parameter of edit url
    const { id } = useParams();

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
    const [genreList, setGenreList] = useState([])

    /*movie state*/

    const initialMovieState = {   //to keep intial state of form
        title: "",
        summary: "",
        genreIdList: []
    };
    const [movie, setMovie] = useState(initialMovieState);


    const getCsvFromArray = (array) => {
        let csv = "";
        for (let i = 0; i < array.length; i++) {
            csv += array[i] + ', '
        }
        return csv;
    }


    let formHeading; //to keep heading of the form
    let initialGenreTags;//to keep initalgenre in dropdown
    useEffect(() => {

        if (props.isEdit) {
            //if the form is edit form, fill it with the movie details
            getMovieDetails(id, (response) => {
                /*Heading of the form to Edit movie*/
                formHeading = "Edit Movie";

                const movieDetail = response.data;
                const movieNewState = {
                    title: movieDetail.title,
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
                setCastNameCSV(castCSV);
                setInitialGenre(movieDetail.genres);
                console.log(intialGenre);
            })

        }
        else {

        }
    }, []);

    if (props.isEdit) {
        formHeading = "Edit Movie Details";
        initialGenreTags = intialGenre;
        console.log(initialGenreTags);
    }
    else {
        formHeading = "Add a Movie";
        initialGenreTags = [];
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
        if (titleError.fieldEmpty || genreError.fieldEmpty) {
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
                    (res)=>{
                    alert('Movie Detail Updated');
                    setTimeout(() => {
                        window.location.href = `/movie/${id}`;
                    }, 2000);
                },
                (error)=>{
                    alert('Error');
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
                    {(titleError.fieldEmpty && feildRequired) ? <div className='warning shake-text'>Movie title cannot be blank</div> : null}


                    <div className='form-group'>
                        <label for='summary' name='plot'>
                            Plot
                        </label>
                        <textarea name='summary' id='summary' rows='15' cols='20' placeholder='Enter here' value={movie.summary} className='form-control' onChange={handleFeildChange}></textarea ><br />
                    </div>
                    {summaryError.limitExceeds ? <div className='warning'>Try to keep summary crisp. Can't be more than 500 characters long. </div> : null}

                    <div className='form-group'>
                        <label for='cast' name='cast-csv'>
                            Casts
                        </label>
                        <input name='cast' id='cast' type='text' placeholder='Enter comma separated names here' value={castNameCSV} onChange={handleFeildChange}></input><br />
                    </div>
                    {inValidName ? <div className='warning'>Names should not contain any number or special character</div> : null}
                    {castError.limitExceeds ? <div className='warning'>Cast name should not be more than 50 characters</div> : null}

                    <div className='form-group'>
                        <label for='genres' name='genre-dropdown'>
                            Genres
                        </label>
                        <span className="required">*</span>
                        <Select name='genres' id='genres' isMulti
                            ref={dropdownSelectInputRef}
                            placeholder='Choose relavant genres'
                            defaultValue={initialGenreTags}
                            getOptionLabel={option => option.name}
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