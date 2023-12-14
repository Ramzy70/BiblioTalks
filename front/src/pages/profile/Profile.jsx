import React from 'react'
import "./profile.css"
import Navbar from "../../Components/navbar/Navbar"
import Book from "../../Components/Book/Book"
import Avatar from "../../Components/avatar/Avatar"
import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
import Footer from "../../Components/footer/Footer"


const Profile = () => {
return (
    
    <div>
    <Navbar/>
    <div className="topPage">
    <Avatar/>
    </div>
    
    <h2 className="title">Read</h2>
    <BookContainer className="bookC"/>
    
    <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
        
            </div>  
    <h2 className="title">Reading</h2>
    <BookContainer classname="bookC" />
    <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
                </div>  
    <h2 className="title">Want to read</h2>
    <BookContainer />
    <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
    </div>  
    <div className="footer">
    <Footer/>
    </div>
    

    </div>
   

)


}


export default Profile