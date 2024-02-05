import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios"
import { useState, useEffect } from "react";
import {Input} from "@nextui-org/react";
import { useContext } from 'react'
import { UserContext } from '../store/userContext'
import Dropzone from 'react-dropzone';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {Textarea} from "@nextui-org/react";


const CreateComment = ({updateMovies}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const userCtx = useContext(UserContext)
    const [size, setSize] = React.useState('5xl')
   
    const handleOpen = (size, e) => {
        e.stopPropagation();
        setSize(size);
        onOpen();
      };


    const createNewRecomendation = () => { 
      const recomendationData = ({ 
        title: title, 
        category: category,
        duration: duration,
        platform: platform,
        score: score,
        movieImage: movieImage,
        observation: observation,
        userName: userCtx.userName,
        UserEmail: userCtx.userEmail,
        userProfileImage: userCtx.userProfileImage,
        userId: userCtx.userId
      })
      console.log(recomendationData)
      axios.post("http://localhost:4000/movies/newRecomendation", recomendationData)
           .then((res) => { 
            console.log(res.data)
            onClose()
            updateMovies()
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    return (
  <>
     <div className="flex flex-wrap gap-3">
       <small color="secondary" variant="shadow" className="font-bold" key={size} onPress={() => handleOpen(size, e)}> Create Comment</small>  
     </div>
          <Modal size={size} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 font-bold">Create Recomendation </ModalHeader>
                  <ModalBody>
                   <div>
                     sahofhasoif
                   </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={createNewRecomendation}>
                      Create
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
}

export default CreateComment

  