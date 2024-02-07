import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../store/userContext'
import NavBarComponent from './Navbar'


const MyGroups = () => {

   const userCtx = useContext(UserContext)
   const {userId} = useParams()

  const getMyGroups = () => { 
    axios.get(`http://localhost:4000/group/getMyGroups/${userId}`)
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  useEffect(() => { 
    getMyGroups()
  }, [])


  return (
    <div>
       <NavBarComponent/>
    </div>
  )
}

export default MyGroups
