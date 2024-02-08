import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Main from './components/Main'
import NavBarComponent from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import { UserProvider } from './store/userContext'
import FilteredMoviesByCategory from './components/FilteredMoviesByCategory'
import RecomendationDetail from './components/RecomendationDetail'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MyRecomendations from './components/MyRecomendations'
import MyGroups from './components/MyGroups'
import GroupPage from './components/GroupPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <UserProvider>
              <Routes>
                <Route path="/register" element={<Register />} />       
                <Route path="/" element={<Login />} />      
                <Route path="/main" element={<Main />} />    
                <Route path="/movies/:category" element={<FilteredMoviesByCategory/>}   />
                <Route path="/movie/:recomendationId" element={<RecomendationDetail/>}   />
                <Route path="/myMovies/:userId" element={<MyRecomendations/>}/>
                <Route path="/myGroups/:userId" element={<MyGroups/>}/>
                <Route path="/group/:groupId" element={<GroupPage/>}/>
              </Routes>
        </UserProvider>
      </> 
  )
}

export default App

