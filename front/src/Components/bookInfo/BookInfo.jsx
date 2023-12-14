import React from 'react'
import "./bookInfo.css"
import {FaStar} from "react-icons/fa"

const BookInfo = ({book}) => {
  const imgPath = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='bookInfo'>
      <div className="bookInfoRight">
          <img src={book.cover
          ? imgPath + book.cover
          : imgPath + "uploads/default_book_cover.jpg"} 
          alt=""  className="bookInfoImg"/>
      </div>
      <div className="bookInfoleft">
        <h1 className="bookInfoName">{book.title}</h1>
        <p className="bookInfoDesc">{book?.description}</p>
        <div className="ratingStars">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <FaStar
                className="star"
                size={19}
                color={currentRating <= book.averageRating ? "#F8B84E" : "#909090"}
              />
            </label>
          );
        })}
      </div>
        <h5 className="generalRating bookBasicInfo"><span className='bold'>General Rating : </span> {book.averageRating}</h5>
        <h5 className="bookInfoAuthor bookBasicInfo"><span className='bold'>Author : </span>{book?.author}</h5>
        <h5 className="bookInfoCategory bookBasicInfo"><span className='bold'>Category : </span>{book?.category}</h5>
        <h5 className="bookInfolanguage bookBasicInfo"><span className='bold'>language : </span>{book?.language}</h5>
        <h5 className="bookInfoDate bookBasicInfo"><span className='bold'>Published : </span>{book?.publishedDate}</h5>
        <div className="myListButtons">
            <button className="haveReadIt btnInfo">I have read it</button>
            <button className="readingIt btnInfo">I am reading it</button>
            <button className="wishlist btnInfo">Add to my wish list</button>
        </div>
      </div>
    </div>
  )
}

export default BookInfo
