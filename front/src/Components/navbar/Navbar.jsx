import React, {useState, useContext} from 'react'
import { useNavigate  } from 'react-router-dom';
import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import {FiChevronDown } from "react-icons/fi";
import categories from "../../utility/categories.json"


const Navbar = () => {

    const [showLinks, setShowLinks] = useState(false)
    const [showSearch, setShowSearch] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const  {user, dispatch } = useContext(AuthContext)

    const imgPath = process.env.REACT_APP_PUBLIC_FOLDER;

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

    const history = useNavigate ();
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (searchKeyword) {
          history(`/search/${searchKeyword}`);
        }
      };

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
                {categories.map((category) => (
                <li key={category.name}>
                    <Link to={`/category/${category.name}`}>{category.name}</Link>
                </li>
                ))}
            </ul>
			</li>
        </ul>
        <form
            className="form"
            action=""
            id={showSearch ? 'hiddenSearch' : ''}
            onSubmit={handleSearch} // Use onSubmit event for form submission
        >
            <input
                className="searchBook"
                type="text"
                placeholder="Search for a Book by name, by category, by author ..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" style={{ textDecoration: 'none' }}>
                <SearchIcon className="searchIcon" />
            </button>
        </form>

        <div className="profile">
            <img src={user.profileImage
                ? imgPath + user.profileImage
                : imgPath + "uploads/default-avatar.jpg"} 
                 onClick={() => setShowProfile(!showProfile)} alt="" />
            <ul className="profileList" id={showProfile ? "" : "hiddens"}>
                <li>
                    <Link to={`/profile/${user._id}`} style={{textDecoration:"none"}}>Profile Page</Link>
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
