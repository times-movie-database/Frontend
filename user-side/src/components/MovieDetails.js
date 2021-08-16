import { useState } from "react";
import "./AddReview.css";
import Modal from "react-modal";
import AddRating from "./AddRating";
import Review from "./Review";
import "./MovieDetails.css";

import Rating from "react-rating";
Modal.setAppElement("#root");
export default function MovieDetails() {
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  return (
    <div class="main-container">
      <div class="detail-container">
        <div class="title-and-edit-container">
          <div class="title">Tenet</div>
          <div class="edit">
            <button className="fa fa-edit edit-btn"></button>
          </div>
          
        </div>
        <div class="genre-items">
          <span className="tagged">Action</span>
          <span className="tagged">Sci-fi</span>
        </div>

        <div class="rating-container">
          <div class="stars">
            <Rating
              initialRating="4"
              emptySymbol="fa fa-star"
              fullSymbol="fa fa-star checked"
              readonly={true}
              fractions={10}
            ></Rating>
            <span className="average">4/5</span>
            <span class="count">(420)</span>
            
          </div>
            
          

          <div class="personal-rating">
            <div className="add" onClick={() => setRating(true)}>
              + Add Your Rating
            </div>
            <Modal
              className="popup"
              isOpen={rating}
              onRequestClose={() => setRating(false)}
            >
              <div className="right-modal">
                <button className="close-btn" onClick={() => setRating(false)}>
                  &times;
                </button>
              </div>
              <div className="details-title">Add Rating</div>

              <AddRating></AddRating>
            </Modal>
          </div>
        </div>

        <div class="summary-item">
          Summary : Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Officia consequatur possimus blanditiis maiores eaque eum, ad magnam
          dolore omnis soluta illum ipsa exercitationem et, nesciunt quaerat
          error saepe. Unde, nesciunt officia animi voluptates sint corrupti
          iure praesentium magnam quisquam iusto quasi sapiente voluptas
          pariatur, reiciendis minima, magni dignissimos doloribus porro.
          <div class="cast-items"><div className="cast-title">Cast:<span className="tagged">ABC</span><span className="tagged">ABC</span></div></div>
        </div>

        
      </div>

      <div class="review-container">
        <div className="review-heading">REVIEWS</div>
        <div class="review-section">
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

        <div class="personal-review">
          <div className="add" onClick={() => setReview(true)}>
            + Add Review
          </div>
          <Modal
            className="popup"
            isOpen={review}
            onRequestClose={() => setReview(false)}
          >
            <h1 className="text">Add Review</h1>
            <div className="center-textarea">
              <textarea
                className="moviedetails"
                placeholder="Add Review"
              ></textarea>
            </div>
          </Modal>{" "}
        </div>
      </div>
    </div>
  );
}
