import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {AcmeLogo} from "../icons/AcmeLogo.jsx";
import {SearchIcon} from "../icons/SearchIcon.jsx";
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/userContext'
import { useContext } from "react";
import CreateRecomendation from "./CreateRecomendation.jsx";
import moviesIcon from "../img/moviesIcon.png"
import CreateNewGroupModal from "./CreateNewGroupModal.jsx";

const NavBarComponent = () =>  {

  const userCtx = useContext(UserContext)
  const navigate = useNavigate()

  const logOutSession = () => { 
    userCtx.updateUser("")
    userCtx.updateUserEmail("")
    userCtx.updateUserProfileImage("")
    userCtx.updateUserName("")
    navigate("/")
  }

  const getMyMovies = () => { 
    navigate(`/myMovies/${userCtx.userId}`)
  }

  const getMyGroups= () => { 
    navigate(`/myGroups/${userCtx.userId}`)
  }
 


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
        <Input
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