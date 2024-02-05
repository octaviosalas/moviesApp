import React from 'react'
import CreateRecomendation from './CreateRecomendation'
import Posts from './Posts'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import CardMovie from './CardMovie'
import NavBarComponent from './Navbar'
import GenItems from './GenItems'
import Search from './Search'
import Loading from './Loading'

const Main = () => {

  const [movies, setMovies] = useState([])
  const [load, setLoad] = useState(true)

    const getMovies = () => { 
        axios.get("http://localhost:4000/movies/allMovies")
        .then((res) => { 
            console.log(res.data)
            setMovies(res.data)
            setTimeout(() => { 
               setLoad(false)
            }, 1500)
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

        {load ? 
          <Loading/>
        :
        <>
          <div className='flex items-center justify-center mt-36'>
            <Search/> 
          </div>
          
          <div className='flex  items-center justify-center mt-12'>
            <GenItems/>
          </div>
        </>
        }

   </div>
  )
}

export default Main
