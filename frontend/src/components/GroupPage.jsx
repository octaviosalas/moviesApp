import React from 'react'
import axios from 'axios'
import {useState, useEffect} from "react"
import { UserContext } from '../store/userContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import NavBarComponent from './Navbar'
import { Avatar } from '@nextui-org/react'
import Search from './Search'
import CardMovie from './CardMovie'
import Loading from "./Loading"

const GroupPage = () => {

    const {groupId} = useParams()
    const [groupRecomendations, setGroupRecomendations] = useState([])
    const [groupData, setGroupData] = useState({})
    const [load, setLoad] = useState(true)

 
    const getGroupPublications = () => { 
        console.log("mandee ", groupId)
        axios.get(`http://localhost:4000/group/groupPublications/${groupId}`)
             .then((res) => { 
                console.log(res.data)
                setGroupRecomendations(res.data.groupRecomendations)
                setTimeout(() => { 
                    setLoad(false)
                }, 2500)
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

    const handleChange = (e) => { 
        const searchTerm = e.toLowerCase(); 
        const filteringFilteredData = groupRecomendations.filter((mov) => mov.title.toLowerCase().includes(searchTerm));
        if(e.length !== 0) { 
            setGroupRecomendations(filteringFilteredData)
        } else { 
            getGroupPublications()
        }   
        
      }

  return (
    <div className='mt-auto'>
        <NavBarComponent/>

       {
       load ? <Loading/> : 
        <>
            <div className='mt-24 2xl:mt-12 min-h-screen flex flex-col items-center justify-center'>
                <p className='font-bold text-violet-700 text-lg'>{groupData.groupName}</p>
                <p className='font-meidum text-sm text-zinc-400'>Creador por: {groupData.creatorName}</p>
                <div 
                 className='rounded-lg w-96 h-56 mt-2' 
                 style={{
                        backgroundImage: `url(${groupData.groupPhoto})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",  // Centra la imagen de fondo
                        }}/>
                <p className='font-meidum text-sm text-zinc-400'>Creado el: {groupData.creationDate}</p>
                <div className='flex flex-col items-center justify-center'>
                   {groupRecomendations.length !== 0 ?
                   <>
                        <div className='mt-6'>
                        <Search inputValue={handleChange}/>
                        </div>
                        <div className='mt-6'>
                        <CardMovie moviesData={groupRecomendations}/>
                        </div>
                   </>
                   :
                   <p className='mt-6 font-medium text-violet-700'>Por el momento no hay peliculas publicadas</p>  
                  }
                </div>
             
               
                
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div>
                  
                </div>
              
            </div>
            </>
        }
           
    
    </div>
  )
}

export default GroupPage
