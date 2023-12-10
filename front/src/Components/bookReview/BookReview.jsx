import React from 'react'
import "./bookReview.css"
import {FaStar} from "react-icons/fa"
import {useState} from 'react'
import Review from '../Review/Review'

const BookReview = () => {

    const [rating, setRating]=useState(null)
    const[hover, setHover] = useState(null)

  return (
    <div className='reviews'>
      <h2 className="reviewTitle">Reviews</h2>
      <input type="text" className="reviewSelf" placeholder='Review the book...' />
      <div className="flexItem">
        <div className="ratingStars">
          {[...Array(5)].map((star,index)=>{
            const currentRating =index+1;
         return (
          <label>
          <input 
          type="radio"
          name="rating"
          value={currentRating}
          onClick={()=>setRating(currentRating)}
          />
        
         <FaStar className ='star'
          size={19}
          color ={currentRating<= (hover || rating)  ? "#F8B84E" : "#909090" }
          onMouseEnter={()=>setHover(currentRating)}
          onMouseLeave={()=>setHover(null)}
          
          />
         </label>

         )
          })}
         
        </div>
        <button className="submitBtn">Submit</button>
      </div>
      <Review/>
      <Review/>
      <Review/>
      <button className="moreReviews">More Reviews</button>
    </div>
  )
}

export default BookReview
