import React from 'react'
import { UserContext } from '../store/userContext'
import { useContext } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import axios from 'axios';

const Notifications = () => {

  const userCtx = useContext(UserContext)

  const getNotifications = () => {
    axios.get(`http://localhost:4000/notifications/${userCtx.userId}`)
      .then((res) => {
        console.log("Notificaciones", res.data);
        console.log("Cantidad", res.data.length);
        const unReadNotifications = res.data.filter((not) => not.read === false)
        userCtx.updateUserNotifications(res.data);
        userCtx.updateUserQuantityNotifications(unReadNotifications.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const updateNotificationsState = (notificationId) => { 
    console.log("acep´tando")

    axios.put(`http://localhost:4000/notifications/${notificationId}`)
         .then((res) => { 
            console.log(res.data)
            getNotifications()
         })
         .catch((err) => { 
            console.log(err)
         })
  }

  const JoinToTheGroup = (groupId, notificationId) => { 
    console.log("entrasndo al grupo")
    const myDataToBeMemberOfTheGroup = ({
       userName: userCtx.userName,
       userId: userCtx.userId,
       userEmail: userCtx.userEmail,
       userProfileImage: userCtx.userProfileImage,
       userRolGroup: "Miembro"
      })
      axios.post(`http://localhost:4000/group/addNewMember/${groupId}`, myDataToBeMemberOfTheGroup)
           .then((res) => { 
            console.log(res.data)
            updateNotificationsState(notificationId)
           })
           .catch((err) => console.log(err))
  }

  const rejectInvitationToTheGroup = (notificationId) => { 
    console.log("rechazando")
   axios.put(`http://localhost:4000/notifications/reject/${notificationId}`)
         .then((res) => { 
            console.log(res.data)
            getNotifications()
          })
         .catch((err) => { 
            console.log(err)
          })
  }

  return (
    <div className='flex gap-2'>
         <Dropdown>
            <DropdownTrigger className="cursor-pointer">
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg> 
                {userCtx.userQuantityNotifications}
            </div>          
            </DropdownTrigger>
             <DropdownMenu aria-label="Static Actions">
                <DropdownItem key={userCtx.userId} className="">           
                    {
                        Array.isArray(userCtx.userNotifications) && userCtx.userNotifications.length !== 0 ? 
                        userCtx.userNotifications.map((not) => ( 
                        <div className="flex flex-col mt-2 justify-start items-start">
                            {not.notificationType === "Invitation" && not.read === false ? ( 
                                <div className="flex flex-col items-start justify-start"> 
                                <div className="flex gap-2 mt-2  "> 
                                <div className="flex gap-2 items-center">
                                    <img src={not.senderProfileImage} className="rounded-full h-6 w-6"/>                      
                                </div>
                                <div>
                                    <small className="text-xs font-medium">{not.senderName}</small>
                                    <p className="text-xs">Te ha invitado a unirte al grupo "<b className="text-zinc-500">{not.groupName}</b>"</p>
                                </div>
                                </div>
                                <div className="mt-3 flex items-start justify-start gap-2">
                                    <Button className="font-medium text-xs h-6" color="secondary" size="xxs" onClick={() => JoinToTheGroup(not.groupId, not._id)}>Aceptar</Button>
                                    <Button className="font-medium text-xs h-6" style={{backgroundColor:"#ECA3F0"}} size="xxs" onClick={() => rejectInvitationToTheGroup(not._id)}>Rechazar</Button>
                                </div>
                                </div> 
                             ) : not.notificationType === "AdminPermission" && not.read === false ? (
                              <div className="flex flex-col items-start justify-start">  
                                  <div className="flex gap-2 mt-2  "> 
                                      <div className="flex gap-2 items-center">
                                          <img src={not.senderProfileImage} className="rounded-full h-6 w-6"/>                      
                                      </div>
                                      <div>
                                          <small className="text-xs font-medium">{not.senderName}</small>
                                          <p className="text-xs">Ha solicitado ser Administrador del grupo "<b className="text-zinc-500">{not.groupName}</b>"</p>
                                      </div>
                                  </div>
                                      <div className="mt-3 flex items-center gap-2">
                                          <Button className="font-medium text-xs h-6" color="secondary" size="xxs" onClick={() => JoinToTheGroup(not.groupId, not._id)}>Aceptar </Button>
                                          <Button className="font-medium text-xs h-6" style={{backgroundColor:"#ECA3F0"}} size="xxs"  onClick={() => rejectInvitationToTheGroup(not._id)}>Rechazar </Button>
                                      </div>
                                </div> 
                             )
                             :
                             null
                           
                            }
                        </div>
                    )) 
                        : 
                       <p>No tenes notificaciones</p>
                    }
                        
                </DropdownItem>         
            </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Notifications

