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
import DemoCarousel from './Carousel'


import { UserContext } from '../store/userContext'
import { useContext } from 'react'

const Main = () => {

  const userCtx = useContext(UserContext)
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

    useEffect(() => { 
     console.log(userCtx.userNotifications)
     console.log(userCtx.userNotifications.length)
    }, [userCtx.userNotifications])


  return (
    <div className='flex flex-col items-center justify-center'>
      <NavBarComponent/>

        {load ? 
          <Loading text={"Cargando Datos"}/>
        :
        <>
          <div className='mt-36'>
            <CreateRecomendation type={"general"} updateMovies={getMovies}/>
          </div>

          <div className='flex items-center justify-center mt-6'>
            <Search/> 
          </div>
          
          <div className='flex  items-center justify-center mt-12'>
            <GenItems/>
          </div>
          <div className='mt-12'>
            <DemoCarousel/>
          </div>
        </>
        }

   </div>
  )
}

export default Main
