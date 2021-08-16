import { useState } from "react";
import "./AddReview.css";
import Modal from "react-modal";
import AddRating from "./AddRating";
import Review from "./Review";
import "./MovieDetails1.css";
import Rating from "react-rating";
Modal.setAppElement("#root");
export default function MovieDetails() {
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const redirectToEditMovie = () => {
    window.location.href = "/movie/add";
  };
  return (
    <div className="main-container">
      <div className="detail-container">
        <div className="title-and-edit-container">
          <div className="title">Tenet
          
          <div className="genre-items">
          <span className="tagged">Action</span>
          <span className="tagged">Sci-fi</span>  
        </div></div>
        <span className="edit">
            <button className="fa fa-edit edit-btn" onClick={redirectToEditMovie}></button>
          </span>
            
        </div>
        

        <div className="rating-container">
          <div className="stars">
            <Rating
              initialRating="4"
              emptySymbol="fa fa-star"
              fullSymbol="fa fa-star checked"
              readonly={true}
              fractions={10}
            ></Rating>
            <span className="average">4/5</span>
            <span className="count">(420)</span>
            
          </div>
            
          

          <div className="personal-rating">
            <div className="add" onClick={() => setRating(true)}>
            <div className="rate-this-star">☆</div>Rate This 
            </div>
            <Modal
              className="popup-rating"
              isOpen={rating}
              onRequestClose={() => setRating(false)}
            >
              <div className="right-modal">
                <button className="close-btn" onClick={() => setRating(false)}>
                  &times;
                </button>
              </div>
              <div className="details-title">How would you like to rate this Movie?</div>

              <AddRating></AddRating>
              <div className="modal-submit"><button className='modal-btn'>Sumbit</button></div>
            </Modal>
          </div>
        </div>

        <div className="summary-item">
          Summary : Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Officia consequatur possimus blanditiis maiores eaque eum, ad magnam
          dolore omnis soluta illum ipsa exercitationem et, nesciunt quaerat
          error saepe. Unde, nesciunt officia animi voluptates sint corrupti
          iure praesentium magnam quisquam iusto quasi sapiente voluptas
          pariatur, reiciendis minima, magni dignissimos doloribus porro.
          <div className="cast-items"><div className="cast-title">Cast:<span className="tagged">ABC</span><span className="tagged">ABC</span></div></div>
        </div>

        
      </div>

      <div className="review-container">
        <div className="review-heading"><button className="user-reviews">User Reviews</button></div>
        <div className="review-section">
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Officia consequatur
            possimus blanditiis maiores eaque eum, ad magnam dolore omnis soluta
            illum ipsa exercitationem et, nesciunt quaerat error saepe. Unde,
            nesciunt officia animi voluptates sint corrupti iure praesentium
            magnam quisquam iusto quasi sapiente voluptas pariatur, reiciendis
            minima, magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Officia consequatur possimus
            blanditiis maiores eaque eum, ad magnam dolore omnis soluta illum
            ipsa exercitationem et, nesciunt quaerat error saepe. Unde, nesciunt
            officia animi voluptates sint corrupti iure praesentium magnam
            quisquam iusto quasi sapiente voluptas pariatur, reiciendis minima,
            magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
          <Review timestamp="21-07-2021">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            consequatur possimus blanditiis maiores eaque eum, ad magnam dolore
            omnis soluta illum ipsa exercitationem et, nesciunt quaerat error
            saepe. Unde, nesciunt officia animi voluptates sint corrupti iure
            praesentium magnam quisquam iusto quasi sapiente voluptas pariatur,
            reiciendis minima, magni dignissimos doloribus porro.
          </Review>
        </div>

        <div className="personal-review">
          <div className="add" onClick={() => setReview(true)}>
            + Review
          </div>
          <Modal
            className="popup-review"
            isOpen={review}
            onRequestClose={() => setReview(false)}
          >
            <div className="right-modal">
                <button className="close-btn" onClick={() => setReview(false)}>
                  &times;
                </button>
              </div>
            <div className="details-title">Add your Review</div>
            <div className="center-textarea">
              <textarea
                className="moviedetails"
                placeholder="Write review..."
              ></textarea>
            </div>
            <div className="modal-submit"><button className='modal-btn'>Sumbit</button></div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
