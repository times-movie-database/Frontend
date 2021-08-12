import { useState } from "react"
import './AddReview.css'
import Modal from 'react-modal';
import AddRating from "./AddRating";
Modal.setAppElement('#root');
export default function MovieDetails(){
    const [review,setReview]=useState(false);
    return(
        
        <div>
            <h2 className="review" onClick={()=>setReview(true)}>+ Add Review</h2> 
            <Modal className='popup' isOpen={review} onRequestClose={()=>setReview(false)}>
                <h1 className='text'>Add Review</h1>
                <textarea className='moviedetails' placeholder="Add Review"></textarea>
            </Modal>
            {/* <AddReview trigger={review} setpopup={setReview}>Add Review</AddReview> */}
            <AddRating trigger={review}></AddRating> 
        </div>
    )
}