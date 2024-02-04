import React from 'react'
import CreateRecomendation from './CreateRecomendation'
import Posts from './Posts'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import CardMovie from './CardMovie'
import NavBarComponent from './Navbar'

const Main = () => {

  const [movies, setMovies] = useState([])

    const getMovies = () => { 
        axios.get("http://localhost:4000/movies/allMovies")
        .then((res) => { 
            console.log(res.data)
            setMovies(res.data)
        })
        .catch((err) => { 
            console.log(err)
        })
    }

    useEffect(() => { 
      getMovies()
    }, [])


  return (
    <div className='flex flex-col items-center justify-center'>
      <NavBarComponent updateMovies={getMovies}/>
      <div className='flex  items-center justify-center mt-12'>
        <Posts movies={movies}/>
      </div>

   </div>
  )
}

export default Main
