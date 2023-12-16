import React from 'react'
import "./categorie.css"
import Navbar from "../../Components/navbar/Navbar"
import LiveChat from "../../Components/livechat/Livechat"
import BookContainer from "../../Components/bookContainer/BookContainer.jsx";
import Footer from "../../Components/footer/Footer"
import categories from '../../utility/categories.json'
import { useParams } from 'react-router-dom';

const Category = ({ match }) => {

  const { category: categoryName } = useParams();
  const category = categories.find((c) => c.name === categoryName);


  return (
    
    <div>
      <Navbar/>
      {category ?
        <>
          <div className='topCategoryPage' >
          <div className="categoryInfo">
            <h1 className="categoryName">{category.name}</h1>
            <h3>{category.description}</h3>
          </div>
          <div className="chat">
            <h4 className="livechatTitle">Communicate and Discuss about this category !</h4>
            <LiveChat/>
          </div>
        </div>
        <h1 className="booksTitle">Explore Books From This Category</h1>
        <BookContainer category={categoryName} pageCategory={true}/>
        </>
          :
          <h2 className='noCategoryFound'>There is no such a Category with the Name of : {categoryName}</h2>
          }
      <Footer/>
    </div>

  )
  
}

export default Category
