import React, {useState} from 'react'
import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

    const [showLinks, setShowLinks] = useState(false)
    const [showSearch, setShowSearch] = useState(true)

  return (
    <div className='navbar'>
        <MenuIcon className='showLinks' onClick={() => setShowLinks(!showLinks)}/>
        <div className="logo">
            <h3>
                BiblioTalks
            </h3>
        </div>
        <ul className="list" id={showLinks ? "hidden" : ""}>
            <li className="itemList">
                Home
            </li>
            <li className="itemList">
                Contact
            </li>
            <li className="itemList">
                Add a Book
            </li>
            <li className="itemList">
                My Lists
            </li>
        </ul>
        <form className='form' action="" id={showSearch ? "hiddenSearch" : ""}>             
                <input className='searchBook' type="text" placeholder='Search for a Book...' />
                <SearchIcon className="searchIcon"/>
        </form>
        <div className="profile">
            <img src="/Images/image2.jpg" alt="" />
        </div>
    </div>
  )
}

export default Navbar
