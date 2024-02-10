import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import likesIconGood from "../img/likesIconGood.png"

const LikesModal = ({quantity, data}) =>  {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  console.log(data)

  return (
    <>
    <div className="flex items-center gap-2">
      <small title="Me gustas" className="cursor-pointer" onClick={onOpen}>{quantity} </small>
      <img src={likesIconGood} className="h-4 w-4 cursor-pointer" onClick={onOpen}/>
    </div>
  
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-md">Me gustas en la Recomendacion</ModalHeader>
              <ModalBody>
                <div className="mb-6 flex flex-col">
                    {data.map((d) => ( 
                        d.likes.map((like) => ( 
                            <div className="flex justify-between mt-2 gap-2 items-center">
                                <div className="flex mt-4 gap-2 items-center">
                                    <img src={like.userProfileImage} className="h-9 w-9 rounded-full"/>
                                    <p className="text-xs 2xl:text-sm lg:text-md">{like.userName}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-xs lg:text-md mt-4">{like.date}</p>
                                </div>
                              
                            </div>
                        ))
                    ))}
                </div>
              </ModalBody>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LikesModal