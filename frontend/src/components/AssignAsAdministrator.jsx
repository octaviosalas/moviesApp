import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios";

const AssignAsAdministrator = ({groupData, userId, userName, updateGroupData}) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  
 
   const updateMemberLikeAdmin = () => { 
    
     axios.put(`http://localhost:4000/group/updateMember/${userId}/${groupData._id}`)
          .then((res) => { 
            console.log(res.data)
            onClose()
            updateGroupData()
          })
          .catch((err) => { 
            console.log(err)
          })
   }


  return (
    <>
      <small onClick={onOpen} className="text-sm font-medium text-zinc-500 cursor-pointer">Asignar como Administrador</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nuevo Administrador para: {groupData.groupName} </ModalHeader>
              <ModalBody>
                <div className="flex flex-col mt-2 items-center justify-center">
                    <p className="font-medium text-black text-md">¿Estas seguro de Asignar a {userName} como Administrador?</p>
                    <div className="mt-4 mb-4 flex items-center justify-center gap-6">
                        <Button color="secondary" className="font-medium text-white text-sm" onClick={() => updateMemberLikeAdmin()}>Confirmar</Button>
                        <Button color="secondary" className="font-medium text-white text-sm">Cancelar</Button>
                    </div>
                </div>
              </ModalBody>           
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AssignAsAdministrator
