import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "mongoose";
import { useContext } from "react";
import { UserContext } from "../store/userContext";

const InviteToGroup = ({type, groupData}) => {

  const userCtx = useContext(UserContext)
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [usersData, setUsersData] = useState([])
  const [filteredNames, setFilteredNames] = useState([])
  const [userSelected, setUserSelected] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [succesNotification, setSuccesNotification] = useState(false)




  const getAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response.data);
        setUsersData(response.data)
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => { 
    getAllUsers()
    console.log(groupData)
  }, [groupData])

  const handleChange = (e) => { 
    if(e.length === 0) {
      console.log(e) 
      setFilteredNames("")
    } else { 
      console.log(e)
      const searchUsers = usersData.filter((user) => user.name.toLowerCase().includes(e))
      console.log(searchUsers)
      setFilteredNames(searchUsers)
    }
  }

  const chooseTheUser = (name) => { 
    setUserSelected([...userSelected, { name }]);
    setFilteredNames("")
    setInputValue("")
  }

  useEffect(() => { 
     console.log(userSelected)
  }, [userSelected])


  const sendInvite = () => {
    userSelected.forEach(async (user) => {
      const notificationsData = {
        notificationType: "Invitation",
        senderName: userCtx.userName,
        senderId: userCtx.userId,
        senderProfileImage: userCtx.userProfileImage,
        groupId: groupData._id,
        groupName: groupData.groupName,
        groupMembers: groupData.members,
        addresseeId: user.name._id,
        addresseeName: user.name.name
      };
      console.log(notificationsData)
      try {
        await axios.post(`http://localhost:4000/notifications/invitation`, {notificationsData});
        console.log(`Invitación enviada a ${user.name.name}`);
        setSuccesNotification(true)
        setTimeout(() => { 
          onClose()
          setSuccesNotification(false)
          setUserSelected([])
          setFilteredNames([])
        }, 2000)
      } catch (error) {
        console.error(`Error al enviar invitación a ${user.name.name}:`, error);
      }
    });
  };


  return (
    <>
       {type === "admin" ?  
        <Button color="secondary" className="font-bold text-white text-md w-60 mt-5" onPress={onOpen}>Invitar</Button> 
          : 
         <Button color="secondary" className="font-bold text-white text-md w-60 mt-5" onPress={onOpen}>Solicitar ser Administrador</Button>
        }
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             {type = "admin" ? <ModalHeader className="flex flex-col gap-1 text-sm">Inivtar nuevo Integrante a "{groupData.groupName}"</ModalHeader> : null}
            {succesNotification !== true ?
              <ModalBody>
                 <Input type="text" label="Nombre del Usuario" variant="bordered" onChange={(e) => handleChange(e.target.value)}/>
                  <div className="absolute">
                     {filteredNames !== "" ? 
                          <div className='options-container absolute top-16 z-20 bg-white  shadow-xl rounded-lg mt-1 w-32 items-center justify-center overflow-y-auto max-h-[300px]' >
                              {filteredNames.map((us) => (
                                  <p className="text-black text-md font-medium mt-1" key={us._id} onClick={() => chooseTheUser(us)}>
                                    {us.name}
                                  </p>
                              ))}
                          </div>
                          :
                            null
                        }
                  </div>
                 
                  {userSelected.length !== 0 ? 
                      userSelected.map((us, index) => ( 
                        <div className="flex flex-col items-start justify-start mt-0 " key={index} >
                            <div className="flex items-center gap-1">
                              <p className="text-xl font-bold"><b>.</b></p>
                              <p className="text-xs text-zinc-600 mt-2">{us.name.name}</p>  
                            </div>
                        </div>
                      ))
                      :
                      null
                    }
                  
              </ModalBody> : 
                <ModalBody className="flex items-center justify-center">
                  <p className="font-medium text-md text-violet-700">Invitacion Enviada</p>
                </ModalBody>
              }
              <ModalFooter className="mt-8">
                <Button style={{backgroundColor:"#D899D8"}} className="font-medium text-white text-sm" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="secondary" className="font-bold text-white text-sm" onClick={() => sendInvite()}>
                  Enviar Invitacion
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default InviteToGroup