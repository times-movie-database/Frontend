import './Popup.css'
export default function AddReview(props){
    return(props.trigger)?(
            <div className="popup">
                <div className="">
        <h1 className='text' >Add Review</h1>
        <textarea placeholder="Add Review"></textarea>
        <button class="close" onClick={()=>props.setpopup(false)}>Close</button>
                </div>

            </div>
        ):""
}