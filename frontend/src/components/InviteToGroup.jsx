import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";


const InviteToGroup = ({type, groupData}) => {


  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
             {type = "admin" ? <ModalHeader className="flex flex-col gap-1">Inivtar nuevo Integrante</ModalHeader> : null}
              <ModalBody>
                 <Input type="text" label="Nombre del Usuario" variant="boredered"/>
                 {groupData._id}
              </ModalBody>
              <ModalFooter className="mt-8">
                <Button style={{backgroundColor:"#D899D8"}} className="font-medium text-white text-sm" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="secondary" className="font-bold text-white text-sm" onPress={onClose}>
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