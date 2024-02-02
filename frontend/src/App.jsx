import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Main from './components/Main'
import NavBarComponent from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import { UserProvider } from './store/userContext'
import FilteredMoviesByCategory from './components/FilteredMoviesByCategory'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <UserProvider>
            <NavBarComponent />
              <Routes>
                <Route path="/register" element={<Register />} />       
                <Route path="/" element={<Login />} />      
                <Route path="/main" element={<Main />} />    
                <Route path="/movies/:category" element={<FilteredMoviesByCategory/>}   />
              </Routes>
        </UserProvider>
      </> 
  )
}

export default App

