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
import {Select, SelectItem} from "@nextui-org/react";
import getDate from "../functions/getDate";



const CreateRecomendation = ({updateMovies}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const userCtx = useContext(UserContext)
    const [size, setSize] = React.useState('5xl')
    const [actualDate, setActualDate] = useState(getDate())
    const [title, setTitle] = useState("")
    const [allGens, setAllGens] = useState("")
    const [language, setLanguage] = useState("")
    const [category, setCategory] = useState("")
    const [duration, setDuration] = useState("")
    const [director, setDirector] = useState("")
    const [actors, setActors] = useState("")
    const [platform, setPlatform] = useState("")
    const [observation, setObservation] = useState("")
    const [score, setScore] = useState("")
    const [movieImage, setMovieImage] = useState("")
    const [filteredData, setFilteredData] = useState("")
    const [showPhotoIcon, setShowPhotoIcon] = useState(true)
    
    const apiKey = '6d25d856';
   
   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


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
              setMovieImage(fileURL)
              setTimeout(() => { 
                setShowPhotoIcon(false)
              }, 500)
       
            });
        });
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
        date: actualDate,
        language: language,
        actor: actors,
        director: director,
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

    useEffect(() => { 
          axios.get("http://localhost:4000/gens/allGens")
               .then((res) => { 
                  console.log(res.data)
                  setAllGens(res.data)
                })
              .catch((err) => { 
                console.log(err)
         })
    }, [])


    const getData = (e) => { 
      if(e.length === 0) { 
        setFilteredData("")
        setTitle("")
        setDuration("")
        setMovieImage("")
        setShowPhotoIcon(true)
        setLanguage("")
        setDirector("")
        setActors("")
      }
       console.log(e)
       setTitle(e)
       axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${e}`)
            .then((res) => { 
              console.log(res.data)
              setFilteredData(res.data)
            })
            .catch((err) => { 
              console.log(err)
            })
    }

    const chooseTheMovie = (movie) => { 
      setTitle(movie.Title)
      setDuration(movie.Runtime)
      setMovieImage(movie.Poster)
      setLanguage(movie.Language)
      setShowPhotoIcon(false)
      setFilteredData("")
      setDirector(movie.Director)
      setActors(movie.Actors)
    }

    


    return (
  <>
     <div className="flex flex-wrap gap-3">
       <Button color="secondary" variant="shadow" className="font-bold" key={size} onPress={() => handleOpen(size)}> Create Recomendation</Button>  
     </div>
          <Modal size={size} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 font-bold">Create Recomendation </ModalHeader>
                  <ModalBody>
                    <div className="flex gap-16 justify-center items-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-col items-center justify-center relative mt-2 w-60">
                              <Input 
                                type="text" 
                                label="Title" 
                                variant="bordered" 
                                value={title} 
                                className="mt-2 w-60 cursor-pointer rounded-lg border border-none text-sm"
                                onChange={(e) => getData(e.target.value)}/>
                                {filteredData !== "" ? 
                                <div className="bg-white shadow-lg">
                                  <p onClick={() => chooseTheMovie(filteredData)}>{filteredData.Title}</p> 
                                </div>
                                :
                                null
                                }
                              </div>
                            <Select
                              items={allGens}
                              label="Category"
                              value={category}
                              placeholder="Selecciona un Genero"
                              className="max-w-xs mt-2"
                              variant="bordered"
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              {(gen) => <SelectItem key={gen.name}>{gen.name}</SelectItem>}
                            </Select>                           
                             <Input 
                                type="text" 
                                label="Platform" 
                                variant="bordered" 
                                value={platform} 
                                className="mt-2 w-60 cursor-pointer rounded-lg border border-none text-sm" 
                                onChange={(e) => setPlatform(e.target.value)}
                             />
                            <Input 
                                type="text" 
                                label="Duration (minutes)" 
                                variant="bordered" 
                                value={duration} 
                                className="mt-2 w-60 cursor-pointer rounded-lg border border-none text-sm" 
                                onChange={(e) => setDuration(e.target.value)}
                            />
                             <Input 
                                type="text" 
                                label="Idioma" 
                                variant="bordered" 
                                value={language} 
                                className="mt-2 w-60 cursor-pointer rounded-lg border border-none text-sm" 
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                            <Input  
                                type="number" 
                                label="Score (1-10)" 
                                variant="bordered" 
                                value={score} 
                                className="mt-2 w-60 cursor-pointer rounded-lg border border-none text-sm" 
                                onChange={(e) => setScore(e.target.value)}
                            />   
                            
                            <Textarea
                                label="Your Comment"
                                variant="bordered"
                                placeholder="Enter your description"
                                disableAnimation
                                className="mt-2"
                                value={observation} 
                                onChange={(e) => setObservation(e.target.value)}
                                disableAutosize
                                classNames={{
                                    base: "max-w-xs",
                                    input: "resize-y min-h-[40px]",
                                }}
                                />  
 
                         </div>
                         <div className="flex flex-col items-center justify-center">
                            <p className="font-bold text-black text-sm mt-4">
                                Upload a Picture of the Movie
                            </p>      
                                <Dropzone onDrop={handleDropImage} className="cursor-pointer">
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'dropzone' })} className=' flex justify-center'>
                                    <input {...getInputProps()} />
                                       <div className=" avatar mt-4 w-72 h-60  flex justify-center rounded-2xl border border-dashed border-gray-900/25 bg-cover bg-center"
                                           style={{ backgroundImage: `url(${movieImage})`, backgroundSize: 'cover',   backgroundRepeat: "no-repeat", }}>
                                             <div className="text-center mt-16">
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

export default CreateRecomendation

  