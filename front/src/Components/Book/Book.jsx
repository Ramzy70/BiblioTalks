import React from 'react'
import "./Book.css"
import {FaStar} from "react-icons/fa"



export default function Book() {
  return (
    <>
    <div className="square">
      <div className="bookComponents">
        <img src="/Images/image2.jpg" alt="" className="bookImg"/>
        <h2 className="bookName">1984</h2> 
        <h3 className="bookAuthor">George Orwell</h3>
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
    </div>
    </>
  )
}
