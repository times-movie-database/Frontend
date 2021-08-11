import { useState } from "react"
import AddReview from "./AddReview";
export default function MovieDetails(){
    const [review,setReview]=useState(false);
    return(
        <div >
            <button onClick={()=>setReview(true)}>Add Review</button>
            <AddReview trigger={review} setpopup={setReview}>Add Review</AddReview>
        </div>
    )
}