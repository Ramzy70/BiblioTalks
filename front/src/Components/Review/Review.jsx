import React from 'react'
import {FaStar} from "react-icons/fa"
import './review.css'

const Review = () => {
    
  return (
    <div className='review'>
      <div className="nameAndRating">
        <h5 className="reviewUser">Mohammed Aamin</h5>
        <div className="ratingStars">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <FaStar
                className="star"
                size={19}
                color={currentRating <= 2 ? "#F8B84E" : "#909090"}
              />
            </label>
          );
        })}
      </div>
      </div>
      <p className="reviewText">In this generation-defining self-help guide, 
      a superstar blogger cuts through the crap to show us how to stop trying to 
      be "positive</p>
    </div>
  )
}

export default Review
