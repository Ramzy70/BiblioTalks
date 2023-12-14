import { useContext } from "react";
import './App.css';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom'
import Home from "./pages/home/Home"
import BookPage from './pages/bookPage/BookPage';
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Categorie from './pages/categorie/Categorie';
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
            <Route path='/books/:bookId' element={<BookPage/>}/*element={user ? <BookPage/> : <Navigate  to="/"/> }*//>
            <Route path='/category/:category' element={<Categorie/>}/>
          </Routes>
      </Router>
    {/* <Categorie/> */}
  
    </>
    
  )
}

export default App
