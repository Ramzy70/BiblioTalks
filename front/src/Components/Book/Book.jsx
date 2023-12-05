import React from 'react'
import "./Book.css"
import {FaStar} from "react-icons/fa"
import {useState} from 'react'



export default function Book() {
  const [rating, setRating]=useState(null)
  const[hover, setHover] = useState(null)
  return (
    <>
    <div className="square">
      <div className="bookComponents">
        <img src="/Images/image2.jpg" alt="" className="bookImg"/>
        <h2 className="bookName">1984</h2> 
        <h3 className="bookAuthor">George Orwell</h3>
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
    </div>
    </>
  )
}
