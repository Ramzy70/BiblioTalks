    import React from 'react'
    import "./categorie.css"
    import Navbar from "../../Components/navbar/Navbar"
    import Book from "../../Components/Book/Book"
    import LiveChat from "../../Components/livechat/Livechat"
    import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
    import Footer from "../../Components/footer/Footer"


    const BookPage = () => {
    return (
        
        <div>
        <Navbar/>
        <div className="head">
        <h1 className="titre">Detective</h1>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem</h3>
        </div>
        <h1 className="books-titre">Books</h1>
        <div className="top-page">
        
            <div className="top">
            <Book />
            </div>
            <div className="top">
            <Book />
            </div>
            <div className="top2">
                <h4 className="livechat-title">Communicate about your this category best book !
    </h4>
            <LiveChat/>
            </div>
        </div>
        <BookContainer/>
        <BookContainer />
        <div className="footer">

        
        <Footer/>
        </div>
        

        </div>

    )
    
    }

    export default BookPage