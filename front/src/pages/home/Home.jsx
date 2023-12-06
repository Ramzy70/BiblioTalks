import React from 'react'
import './home.css'
import "bootstrap/dist/css/bootstrap.min.css";  
import Navbar from '../../Components/navbar/Navbar'
import Footer from '../../Components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="cover">
        <h1>ONLINE BOOK LIST</h1>
        <h4>Rate, Discuss and Read !</h4>
        <a href="#contact">Learn More</a>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
