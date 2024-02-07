import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBarComponent from './Navbar'
import MyMoviesCard from './MyMoviesCard'
import Search from './Search'
import Loading from './Loading'
import { Avatar } from '@nextui-org/react'
import { useContext } from 'react'
import { UserContext } from '../store/userContext'

const MyRecomendations = () => {

   const {userId} = useParams()
   const userCtx = useContext(UserContext)
   const [myPublications, setMyPublications] = useState([])
   const [load, setLoad] = useState(true)

   const getMyMovies = () => { 
        axios.get(`http://localhost:4000/movies/allMovies`)
        .then((res) => { 
        const data = res.data
        console.log(data)
        const getOnlyMyPubs = data.filter((d) => d.userId === userId)
        setMyPublications(getOnlyMyPubs)
        console.log(getOnlyMyPubs)
        setTimeout(() => { 
            setLoad(false)
        }, 1500)
        })
        .catch((err) => { 
        console.log(err)
        })
   }

   useEffect(() => { 
    getMyMovies()
   }, [userId])
   

   const handleChange = (e) => { 
    const searchTerm = e.toLowerCase(); 
    const filteringFilteredData = myPublications.filter((mov) => mov.title.toLowerCase().includes(searchTerm));
    if(e.length !== 0) { 
        setMyPublications(filteringFilteredData)
    } else { 
        getMyMovies()
    }   
    }

  
    return (
    <div>
        <NavBarComponent/>

       {load ? 
        <Loading/>
       :
       <div className='h-screen flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
             <Avatar src={userCtx.userProfileImage} className="w-20 h-20 text-large" />
             <p className='font-medium text-black text-sm xl:text-md mt-3'>{userCtx.userName}</p>
          </div>
            <div className='mt-6'>
                <Search inputValue={handleChange}/>
            </div>
            <div className='mt-10'>
               <MyMoviesCard updateMovies={getMyMovies} moviesData={myPublications}/>
            </div>
        </div>}

    </div>
  )
}

export default MyRecomendations
