import { useContext } from "react";
import './App.css';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom'
import Home from "./pages/home/Home"
import BookPage from './pages/bookPage/BookPage';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Categorie from './pages/categorie/Categorie';
import Profile from "./pages/profile/Profile";
import Recherche from "./pages/recherche/Recherche";
import AddBook from "./pages/addBook/AddBook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext)
  return (
   <>  
    <Router>
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate  to="/login"/>}/>
            <Route path='/login' element={user ? <Navigate  to="/"/> : <Login/>}/>
            <Route path='/register'  element={user ? <Navigate  to="/"/> : <Register/>}/>
            <Route path='/books/:bookId' element={user ? <BookPage/> : <Navigate  to="/"/> }  />
            <Route path='/profile/:profile' element={user ? <Profile/> : <Navigate  to="/"/> }/>
            <Route path='/category/:category' element={user ? <Categorie/> : <Navigate  to="/"/> }/>
            <Route path='/search/:keyboard' element={user ? <Recherche/> : <Navigate  to="/"/> }/>
            <Route path='/addBook' element={user ? <AddBook/> : <Navigate  to="/"/> }/>
          </Routes>
      </Router>
  
    </>
    
  )
}

export default App
