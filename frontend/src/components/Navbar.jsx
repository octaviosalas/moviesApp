import React, { useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import {AcmeLogo} from "../icons/AcmeLogo.jsx";
import {SearchIcon} from "../icons/SearchIcon.jsx";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/userContext'
import { useContext } from "react";
import CreateRecomendation from "./CreateRecomendation.jsx";
import moviesIcon from "../img/moviesIcon.png"
import CreateNewGroupModal from "./CreateNewGroupModal.jsx";
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import ViewNotifications from "./ViewNotifications";
import Notifications from "./Notifications.jsx";
import { useState } from "react";
import axios from "axios";

const NavBarComponent = () =>  {

  const userCtx = useContext(UserContext)
  const navigate = useNavigate()
  const [filteredNames, setFilteredNames] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [movieSelected, setMovieSelected] = useState({ movieName: "", movieId: "" });
 const [moviesAvailable, setMoviesAvailable] = useState([])

  const getMovies = () => { 
    axios.get("http://localhost:4000/movies/allMovies")
    .then((res) => { 
        console.log(res.data)
        setMoviesAvailable(res.data)
        
    })
    .catch((err) => { 
        console.log(err)
    })
 }

  const logOutSession = () => { 
    userCtx.updateUser("")
    userCtx.updateUserEmail("")
    userCtx.updateUserProfileImage("")
    userCtx.updateUserName("")
    userCtx.updateUserNotifications([])
    userCtx.updateUserQuantityNotifications(null)
  
    navigate("/")
  }

  const getMyMovies = () => { 
    navigate(`/myMovies/${userCtx.userId}`)
  }

  const getMyGroups= () => { 
    navigate(`/myGroups/${userCtx.userId}`)
  }

  const handleChange = (e) => {
    if(e.length === 0) { 
      setFilteredNames([])
      setMovieSelected({ movieName: "", movieId: "" });
    } else { 
      const useInputToFindTheMovie = moviesAvailable.filter((mov) => mov.title.toLowerCase().includes(e))
      setFilteredNames(useInputToFindTheMovie)
    }
  }

  const chooseTheMovie = async (recomendationId, movieName) => { 
       setMovieSelected({ movieName: movieName, movieId: recomendationId })
       setTimeout(() => { 
        navigate(`/movie/${recomendationId}`)
        setFilteredNames([])
       }, 200)
  }


  useEffect(() => { 
    getMovies()
  }, [userCtx.userId])

  
  return (
    <div className="fixed z-50 top-0 left-0 right-0 inset-x-0 bg-violet-500  text-white h-16 w-full" >
       <Navbar isBordered >
      <NavbarContent justify="start">
        <NavbarBrand className="">
          <div className="flex gap-4 justify-center items-center">
            <img src={moviesIcon} className="h-10 w-10"/>
            <p className="hidden sm:block font-bold text-white cursor-pointer" onClick={() => navigate("/main")}>Movies App</p>
            <CreateNewGroupModal/>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex ">         
            
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
         <Notifications/>
         <div>
            <Input
                onChange={(e) => handleChange(e.target.value)}
                color={"secondary"}
                classNames={{
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              className="w-56 lg:w-64 xl:w-80 h-12 text-black"
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
            <div className="absolute">
                {filteredNames !== "" ? 
                    <div className=' absolute bg-white  shadow-xl rounded-lg mt-1 w-32 lg:w-56 items-start justify-start overflow-y-auto max-h-[300px]' >
                        {filteredNames.map((mov) => (
                          <p className="text-black text-md font-medium mt-1 cursor-pointer hover:text-zinc-500" key={mov._id} onClick={() => chooseTheMovie(mov._id, mov.title)}>
                            {mov.title}
                          </p>
                        ))}
                    </div>
                              :
                                null
                            }
            </div>  
         </div>
        
      
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
          <Avatar
              isBordered
              as="button"
              className="transition-transform"
              size="sm"
              src={userCtx.userProfileImage}
              style={{
                width: '2rem',
                height: '2rem',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${userCtx.userProfileImage})`,

              }}>
            </Avatar>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userCtx.userEmail}</p>
            </DropdownItem>
            <DropdownItem key="analytics" onClick={() => navigate("/main")}>Inicio</DropdownItem>     
            <DropdownItem key="settings" onClick={() => getMyMovies()}>Mis Publicaciones</DropdownItem>
            <DropdownItem key="team_settings" onClick={() => getMyGroups()}>Mis Grupos</DropdownItem>
            <DropdownItem key="analytics" onClick={() => logOutSession()}>Cerrar Sesion</DropdownItem>         

          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    </div>
  );
}

export default NavBarComponent