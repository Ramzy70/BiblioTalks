import React from 'react'
import './home.css'
import "bootstrap/dist/css/bootstrap.min.css";  
import Navbar from '../../Components/navbar/Navbar'
import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
import Footer from '../../Components/footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="cover">
        <h1>ONLINE BOOK LIST</h1>
        <h4>Rate, Discuss and Read !</h4>
        <a href="#contact">Learn More</a>
      </div>
      <BookContainer title="Top rated"/>
      <BookContainer title="Popular Now"/>
      <BookContainer title="New"/>
      <BookContainer title="Detective" category={true}/>
      <BookContainer title="Love" category={true}/>
      <Footer/>
    </div>
  )
}

export default Home
