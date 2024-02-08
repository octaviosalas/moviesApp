import React from 'react'
import { useParams } from 'react-router-dom'
import NavBarComponent from './Navbar'
import axios from "axios"
import { useState, useEffect } from "react";
import { useContext } from 'react'
import { UserContext } from '../store/userContext'
import {Textarea} from "@nextui-org/react";
import getDate from '../functions/getDate';
import CardMovieIndividual from "./CardMovieIndividual"
import {Avatar} from "@nextui-org/react";
import Loading from "./Loading"
import {Button} from "@nextui-org/react";
import like from "../img/like.png"
import noLike from "../img/noLike.png"
import LikesModal from './LikesModal';


const RecomendationDetail = () => {

    const {recomendationId} = useParams() 
    const userCtx = useContext(UserContext)
    const [comment, setComment] = useState("")
    const [date, setDate] = useState(getDate())
    const [ load, setLoad] = useState(true)
    const [addresseeId, setAddresseeId] = useState("")
    const [recomendation, setRecomendation] = useState("")
    const [quantityLikes, setQuantityLikes] = useState(0)
    const [recomendationGralData, setRecomendationGralData] = useState([])
    const [recomendationCommentsReceived, setRecomendationCommentsReceived] = useState([])
    const [dontLike, setDontLike] = useState(true)

    const getComments = () => { 
      axios.get(`http://localhost:4000/comments/publicationComments`)
             .then((res) => { 
              const filteredComments = res.data.filter((d) => d.recomendationId === recomendationId)
              console.log(filteredComments)
              setRecomendationCommentsReceived(filteredComments)
             })
             .catch((err) => { 
              console.log(err)
             })
    }

    const getPublicationData = () => { 
            axios.get(`http://localhost:4000/movies/${recomendationId}`)
            .then((res) => { 
                console.log(res.data)
                const quantityLikes = res.data.likes.length
                setQuantityLikes(quantityLikes)
                const searchMyLike = res.data.likes.filter((like) => like.userId === userCtx.userId)
                console.log(searchMyLike)
                if(searchMyLike.length === 0) { 
                  setDontLike(true)
                } else { 
                  setDontLike(false)
                }
                setRecomendationGralData([res.data]);
                setAddresseeId(res.data.userId)
                setRecomendation(res.data._id)
            })
            .catch((err) => { 
                console.log(err)
            })
    }

    useEffect(() => { 
        getPublicationData()  
        getComments()
    }, [recomendationId])

   const createNewComment = () => { 
      const commentData = ({ 
        creatorId: userCtx.userId,
        creatorName: userCtx.userName,
        creatorEmail: userCtx.userEmail,
        creatorProfileImage: userCtx.userProfileImage,
        comment: comment,
        addresseeId: addresseeId,
        recomendationId: recomendation ,
        commentsLike: 0
      })
      axios.post("http://localhost:4000/comments/createComment", commentData)
           .then((res) => { 
            console.log(res.data)
            setComment("")
            setTimeout(() => { 
              getComments()
            }, 600)   
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const putLikeToRecomendation = () => { 
      const likeData = { 
          date: date,
          userId: userCtx.userId,
          userName: userCtx.userName,
          userProfileImage: userCtx.userProfileImage,
          addresseeId: addresseeId,        
      };
  
      axios.put(`http://localhost:4000/movies/update/${recomendationId}`, { likedata: likeData })
          .then((res) => {
              console.log(res.data);
              getPublicationData()
          })
          .catch((err) => { 
              console.log(err);
          });
    };

    const removeLike = () => { 

      const userData = { 
        userId: userCtx.userId, 
        userName: userCtx.userName
    };
    console.log('Datos a enviar:', userData);

    axios.put(`http://localhost:4000/movies/removeLike/${recomendationId}`, { userData: userData })
         .then((res) => {
            console.log(res.data);
            getPublicationData()
        })
        .catch((err) => { 
            console.log(err);
        });
    }

    const deleteComment = (commentId) => { 
        console.log(commentId)
        axios.delete(`http://localhost:4000/comments/${commentId}`)
             .then((res) => { 
              console.log(res.data)
              getComments()
             })
             .catch((err) => { 
              console.log(err)
             })
    }

    useEffect(() => { 
      console.log(addresseeId)
      setTimeout(() => { 
       setLoad(false)
      }, 1000)
    }, [recomendationGralData, addresseeId, recomendation, recomendationCommentsReceived])


  return (
    <div>
          <NavBarComponent/>
          <div className='flex flex-col  xl:flex-row mt-16 md:mt-24 lg:mt-24 xl:mt-16 2xl:mt-12 items-center gap-12  md:gap-20  lg:gap-24 xl:gap-28 '>
            
           {load ?
            <Loading/>
               :<>
               <div className='flex flex-col'>
              <CardMovieIndividual moviesData={recomendationGralData}/>
                <div className='flex items-center justify-center mt-3 cursor-pointer' title="Me Gusta">
                 {
                 dontLike ?  <img src={noLike} className='h-8 w-8' onClick={() => putLikeToRecomendation()}/> 
                 :  
                 <img src={like} className='h-8 -w-8' onClick={()=> removeLike()}/>
                 }
                </div>
            </div>
            <div className='flex flex-col justify-center'>
              <div>
                {recomendationGralData.map((data) =>  (
                  <div className='flex flex-col justify-between '>
                      <div className='flex justify-between items-center'>
                          <div className='flex justify-start gap-2 items-center'>
                            <Avatar src={data.userProfileImage} size="md" />
                            <p className='text-sm font-medium'>{data.userName} </p>
                          </div>
                          <div className='flex justify-enditems-center'>
                             <LikesModal quantity={quantityLikes} data={recomendationGralData}/>
                          </div>
                      </div>
                     
                     <div className='flex justify-start mt-2'>
                       <p className='text-sm xl:text-lg font-medium'>Comentario del autor: </p>
                     </div>
                     <div className='flex text-start items-start justify-start mt-2'>
                        <p>{data.observation}</p>
                     </div>
                  </div>
                ))}
              </div>
               
               <div className='mt-12'>
                <div className='flex justify-start'>
                  <h4 className='text-sm xl:text-lg font-medium'>Comentarios ({recomendationCommentsReceived.length}) :</h4>
                </div>
                   {recomendationCommentsReceived.length !== 0 ? 


                   <div>
                      {recomendationCommentsReceived.map((com) => ( 
                        <div className='flex items-center mt-2' key={com._id}> 
                           
                            <div className='flex justify-start gap-4'>
                              <Avatar src={com.creatorProfileImage} size="sm" />
                            </div>
                            <div className='ml-2 flex flex-col items-start justify-start'>
                              <p className='text-sm font-medium'>{com.creatorName}</p> 
                              <p className='text-xs'>{com.comment}</p>   
                              {
                                com.creatorId === userCtx.userId ?
                                  <p className='text-xs text-zinc-500 cursor-pointer underline' onClick={() => deleteComment(com._id)}>
                                    Eliminar
                                  </p>  
                                  :
                                null
                              }                     
                            </div>
                        </div>
                      ))}
                    </div> 

                    
                    :
                   <p className='text-md font-medium'>Esta publicacion aun no ha recibido comentarios</p>}
               </div>

               <div className='mt-6 flex flex-col justify-start '>
                 <div className='flex items-start justify-start flex-col'>
                       <h4 className='text-sm xl:text-lg font-medium ml-2 mt-1'>Dejar un comentario : </h4>                  
                        <Textarea
                          onChange={(e) => setComment(e.target.value)}
                          label="Tu comentario"
                          variant="faded"
                          placeholder="Escribe tu comentario.."
                          disableAnimation
                          value={comment}
                          disableAutosize
                          className='w-full'
                          classNames={{                       
                            input: "resize-y min-h-[40px]",
                          }}
                        />
                 </div>
                 <div className='flex justify-end mt-2'>
                   <Button color="secondary" variant="shadow" onClick={() => createNewComment()}> Enviar Comentario </Button>  
                 </div>
               </div>


            {/* <div>
                <input type='text' className='text-md w-72 h-10 border' onChange={(e) => setComment(e.target.value)}/>
                <button onClick={() => createNewComment()}>Enviar</button>
                    </div> */}

            </div>
            </>
            }
          </div>
    </div>
  )
}

export default RecomendationDetail