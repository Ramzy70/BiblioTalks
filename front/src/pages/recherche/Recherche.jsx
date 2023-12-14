import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
import Footer from "../../Components/footer/Footer"
import Dropdown from "../../Components/dropdownMenu/Dropdown";
import Navbar from "../../Components/navbar/Navbar.jsx";
import "./recherche.css"


const Recherche = () => {
  return (
    <div>
      <Navbar/>
      
      <Dropdown id="dropdown"/>
      <h2 className="title">Results of 1984</h2>
      <BookContainer />
      <BookContainer />
      <div className="seeMoreBtn">
                    <button className="seeMore">See More</button>
    </div> 
      <Footer/>
    </div>
  )
}

export default Recherche;
