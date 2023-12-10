import React from 'react'
import "./bookPage.css"
import Navbar from "../../Components/navbar/Navbar"
import BookInfo from "../../Components/bookInfo/BookInfo"
import BookReview from "../../Components/bookReview/BookReview"
import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
import Footer from "../../Components/footer/Footer"


const BookPage = () => {
  return (
    <div>
      <Navbar/>
      <BookInfo/>
      <BookReview />
      <BookContainer title="Similar"/>
      <BookContainer title="Recommended  "/>
      <Footer/>
    </div>
  )
}

export default BookPage
