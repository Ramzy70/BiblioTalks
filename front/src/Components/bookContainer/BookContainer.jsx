import React from 'react'
import "./bookContainer.css"
import Book from "../Book/Book.jsx"

export default function bookContainer() {
  return (
    <>
        <div className="categorie">
            <h2 className="title">Top rated</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
        </div>

        <div className="categorie">
            <h2 className="title">Popular Now</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
        </div>

        <div className="categorie">
            <h2 className="title">New</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
        </div>


        <div className="categorie">
            <h2 className="title">Detective</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
            <div className="seeMoreBtn">
            <button className="seeMore">See More</button>
            </div>        
        </div>


        <div className="categorie">
            <h2 className="title">Love</h2>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
            <div className="seeMoreBtn">
            <button className="seeMore">See More</button>
            </div>
        </div>


   
    
    
    </>
  )
}
