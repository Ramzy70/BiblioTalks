import React from 'react'
import "./bookInfo.css"
import {FaStar} from "react-icons/fa"

const BookInfo = () => {
  return (
    <div className='bookInfo'>
      <div className="bookInfoRight">
          <img src="/Images/image2.jpg" alt="" className="bookInfoImg"/>
      </div>
      <div className="bookInfoleft">
        <h1 className="bookInfoName">1984</h1>
        <p className="bookInfoDesc">In this generation-defining self-help guide, a superstar blogger cuts
        through the crap to show us how to stop trying to be "positive" all the time so
        that we can truly become better, happier people</p>
        <div className="ratingStars">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <FaStar
                className="star"
                size={19}
                color={currentRating <= 4 ? "#F8B84E" : "#909090"}
              />
            </label>
          );
        })}
      </div>
        <h5 className="generalRating bookBasicInfo"><span className='bold'>General Rating : </span> 4</h5>
        <h5 className="bookInfoAuthor bookBasicInfo"><span className='bold'>Author : </span>George Orwell</h5>
        <h5 className="bookInfoCategory bookBasicInfo"><span className='bold'>Category : </span>Detective, Love</h5>
        <h5 className="bookInfolanguage bookBasicInfo"><span className='bold'>language : </span>English</h5>
        <h5 className="bookInfoDate bookBasicInfo"><span className='bold'>Published : </span>19/08/2000</h5>
        <div className="myListButtons">
            <button className="haveReadIt btnInfo">I have read it (80)</button>
            <button className="readingIt btnInfo">I am reading it (18)</button>
            <button className="wishlist btnInfo">Add to my wish list (120)</button>
        </div>
      </div>
    </div>
  )
}

export default BookInfo
