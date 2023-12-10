import React from 'react'
import {FaStar} from "react-icons/fa"
import {useState} from 'react'
import './review.css'

const Review = () => {

    const [rating, setRating]=useState(null)
    const[hover, setHover] = useState(null)
    
  return (
    <div className='review'>
      <div className="nameAndRating">
        <h5 className="reviewUser">Mohammed Aamin</h5>
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
      </div>
      <p className="reviewText">In this generation-defining self-help guide, 
      a superstar blogger cuts through the crap to show us how to stop trying to 
      be "positive</p>
    </div>
  )
}

export default Review
