import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../store/userContext'
import NavBarComponent from './Navbar'
import MyGroupsCard from './MyGroupsCard'


const MyGroups = () => {

   const userCtx = useContext(UserContext)
   const {userId} = useParams()
   const [myGroups, setMyGroups] = useState([])

  const getMyGroups = () => { 
    axios.get(`http://localhost:4000/group/getMyGroups/${userId}`)
         .then((res) => { 
          console.log(res.data)
          setMyGroups(res.data)
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
       {
          myGroups.length === 0 
          ?
          <p className='font-medium text-violet-700 text-lg'>No tienes Grupos</p> 
          : 
          <MyGroupsCard groups={myGroups} updateData={getMyGroups}/>
        }
    </div>
  )
}

export default MyGroups
