import './App.css';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import BookPage from './pages/bookPage/BookPage';
import Login from './pages/login/Login';
import Livechat from './Components/livechat/Livechat';
import BookContainer from './Components/bookContainer/BookContainer';
import Categorie from './pages/categorie/Categorie';

function App() {
  return (
  /*  <>  
    <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/book' element={<BookPage/>}/>
             <Route path='/register' element={<Register/>}/> 
          </Routes> 
      </Router>
    </> */
    <>
    <Categorie/>
  
    </>
    
  )
}

export default App
