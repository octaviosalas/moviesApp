import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import getDate from "../functions/getDate";
import Dropzone from 'react-dropzone';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useContext } from "react";
import { UserContext } from '../store/userContext'


const CreateNewGroupModal = () => {

  const userCtx = useContext(UserContext)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('sm')
  const [date, setDate] = useState(getDate())
  const [groupName, setGroupName] = useState("")
  const [groupPhoto, setGroupPhoto] = useState("")
  const [showPhotoIcon, setShowPhotoIcon] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  const handleDropImage = (files) => {
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append('upload_preset', 'App-Cars');
      formData.append('api_key', '687985773113572');
      formData.append('timestamp', Date.now() / 1000 / 0);
     
      return axios
        .post('https://api.cloudinary.com/v1_1/dgheotuij/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then((res) => {
          const data = res.data;
          const fileURL = data.secure_url;
          console.log(fileURL);
          setGroupPhoto(fileURL)
          setTimeout(() => { 
            setShowPhotoIcon(false)
          }, 500)
   
        });
    });
  };

  const createNewGroup = () => { 
    const groupData = {
      groupName: groupName,
      groupPhoto: groupPhoto,
      creationDate: date,
      creatorId: userCtx.userId,
      creatorName: userCtx.creatorName,
      members: [
        {
          userName: userCtx.userName,
          userId: userCtx.userId,
          userEmail: userCtx.userEmail,
          userProfileImage: userCtx.userProfileImage,
          userRolGroup: "Admin" 
        }
      ]
  };
    if(groupPhoto !== "" && groupName !== "") { 
        axios.post("http://localhost:4000/group/create", groupData)
             .then((res) => { 
                console.log(res.data)
                onClose()
             })
             .catch((err) => { 
                console.log(err)
             })
    } else { 
        setErrorMessage(true)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        
          <p className="hidden sm:block font-bold text-white cursor-pointer"  onClick={() => handleOpen(size)}> Crear nuevo Grupo </p>
       
      </div>
        <Modal 
            size={size} 
            isOpen={isOpen} 
            onClose={onClose} 
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex items-center justify-center"> 
                 <div className="flex justify-start items-center mt-8">
                    <Input 
                        type="text" 
                        label="Nombre del Grupo" 
                        variant="bordered" 
                        value={groupName} 
                        className="mt-2 w-44 md:w-60 cursor-pointer rounded-lg border border-none text-sm" 
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center justify-center mt-2">
                   <p className="font-medium text-zinc-500 text-sm">Selecciona una foto para el Grupo</p>
                 </div>
                 <div>
                 <Dropzone onDrop={handleDropImage} className="cursor-pointer">
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'dropzone' })} className=' flex justify-center'>
                                    <input {...getInputProps()} />
                                       <div className=" avatar mt-4 w-24 h-24 flex justify-center rounded-full border border-dashed border-gray-900/25 bg-cover bg-center"
                                           style={{ backgroundImage: `url(${groupPhoto})`, backgroundSize: 'cover',   backgroundRepeat: "no-repeat", }}>
                                             <div className="text-center ">
                                                  {showPhotoIcon ?  <PhotoIcon className="mx-auto mt-6 h-12 w-12 text-gray-300" aria-hidden="true" /> : null}
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                        
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                    </div>
                                              </div>
                                        </div>
                                  </div> )}
                            </Dropzone>
                 </div>
              </ModalBody>
                <ModalFooter className="flex justify-center items-center m-4">
                    <Button style={{backgroundColor:"#C4ACD5"}} className="font-bold text-sm text-white" onPress={onClose}>
                       Cancelar
                    </Button>
                    <Button color="secondary" className="font-bold text-sm text-white" onClick={() => createNewGroup()}>
                        Crear Grupo
                    </Button>
                </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default CreateNewGroupModal