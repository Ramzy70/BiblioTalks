import React from 'react'
import "./bookContainer.css"
import Book from "../Book/Book.jsx"

export default function bookContainer({title , category}) {
  return (
    <div className='bookContainer'>


        <div className="categorie">
            <h2 className="title">{title}</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
            {category &&
                <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
                </div>        
            }
        </div>


    </div>
  )
}
