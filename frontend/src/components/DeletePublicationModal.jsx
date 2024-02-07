import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import axios from "axios";


const DeletePublicationModal = ({movData}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deleteMyRecomendation = (movData) => { 
    axios.delete(`http://localhost:4000/movies/${movData}`)
         .then((res) => { 
           console.log(res.data)
         })
         .catch((err) => { 
           console.log(err)
         })
     }

     useEffect(() => { 
        console.log(movData)
     }, [movData])

     const handleOpenModal = (event) => {
        onOpen();
        event.stopPropagation() 
      };


  return (
    <>
      <small onClick={handleOpenModal} className="text-sm font-medium text-black" color="primary">Eliminar</small>
      <Modal  isOpen={isOpen}  onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center">
                   <p className="text-md">¿Estas seguro de eliminar esta recomendacion?</p>
                   <p className="text-sm mt-2">No podras recuperarla</p>
                </div>

                <div className="mt-4 flex justify-center items-center">
                    <Button color="secondary" onClick={() => deleteMyRecomendation()}>Eliminar</Button>
                    <Button color="secondary" onPress={onClose}>Cancelar</Button>
                </div>
              </ModalBody>            
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeletePublicationModal

