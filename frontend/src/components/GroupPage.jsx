import React from 'react'
import axios from 'axios'
import {useState, useEffect} from "react"
import { UserContext } from '../store/userContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import NavBarComponent from './Navbar'
import { Avatar } from '@nextui-org/react'

const GroupPage = () => {

    const {groupId} = useParams()
    const [groupRecomendations, setGroupRecomendations] = useState([])
    const [groupData, setGroupData] = useState({})
 
    const getGroupPublications = () => { 
        console.log("mandee ", groupId)
        axios.get(`http://localhost:4000/group/groupPublications/${groupId}`)
             .then((res) => { 
                console.log(res.data)
                setGroupRecomendations(res.data.groupRecomendations)
             })
             .catch((err) => { 
                console.log(err)
             })
    }

    const getGroupData = () => { 
       axios.get(`http://localhost:4000/group/groupData/${groupId}`) 
            .then((res) => { 
                console.log(res.data)
                setGroupData(res.data)
            })
            .catch((err) => { 
                console.log(err)
            })
    }

    useEffect(() => { 
        getGroupPublications()
        getGroupData()
    }, [])

    useEffect(() => { 
        console.log(groupRecomendations)
    }, [groupRecomendations])

  return (
    <div className='max-h-screen'>
        <NavBarComponent/>
        <div className='mt-24 flex flex-col items-center justify-center'>
            <Avatar src={groupData.groupPhoto}/>
            <p>Grupo: {groupData.groupName}</p>
            <p>Creador: {groupData.creatorName}</p>
            <p>Fecha de Creacion: {groupData.creationName}</p>
            <p>Cantidad de Recomendaciones realizadas: {groupRecomendations.length}</p>
        </div>
        <div className='flex items-center justify-center'>
          {groupRecomendations.length}
        </div>
  
    </div>
  )
}

export default GroupPage
