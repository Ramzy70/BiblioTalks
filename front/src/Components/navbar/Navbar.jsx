import React, {useState, useContext} from 'react'
import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";


const Navbar = () => {

    const [showLinks, setShowLinks] = useState(false)
    const [showSearch, setShowSearch] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const  {user ,  isFetching, error, dispatch } = useContext(AuthContext)

    const logoutCall = async (dispatch) => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:5000/users/logout",
                null,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
            dispatch({type:"LOGOUT"})
            console.log("Logout successful", res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const logoutClick = (e) => {
        e.preventDefault()
        logoutCall(dispatch)
    }

  return (
    <div className='navbar'>
        <MenuIcon className='showLinks' onClick={() => setShowLinks(!showLinks)}/>
        <div className="logo">
            <h3>
                <Link to="/" style={{textDecoration:"none"}}>
                    BiblioTalks
                </Link>
            </h3>
        </div>
        <ul className="list" id={showLinks ? "hidden" : ""}>
            <li className="itemList">
                <a href="#contact">Contact</a>
            </li>
            <li className="itemList">
                Add a Book
            </li>
            <li className="itemList">
                My Lists
            </li>
            <li className="itemList"> Category <FiChevronDown />
			    <ul>
					<li>Fiction</li>
					<li>Horror</li>
                    <li>Classic</li>
                    <li>Crime</li>
                    <li>Fantasy</li>
                    <li>Children</li>
			    </ul>
			</li>
        </ul>
        <form className='form' action="" id={showSearch ? "hiddenSearch" : ""}>             
                <input className='searchBook' type="text" placeholder='Search for a Book...' />
                <SearchIcon className="searchIcon"/>
        </form>
        <div className="profile">
            <img src="/Images/image2.jpg" onClick={() => setShowProfile(!showProfile)} alt="" />
            <ul className="profileList" id={showProfile ? "" : "hiddens"}>
                <li>
                    <Link to="/" style={{textDecoration:"none"}}>Profile Page</Link>
                </li>
                <li>
                    <form onSubmit={logoutClick}><button>Log Out</button></form>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
