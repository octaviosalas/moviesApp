import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import CreateComment from "./CreateComment";
import CreateRecomendation from "./CreateRecomendation";

/*
 addresseeId: { 
        type: String
    }, 
    creatorId: { 
        type: String
    },
    date: { 
        type: String
    },
    recomendationId: { 
        type: String
    },
    comment: { 
        type: String
    },
    commentsLike: { 
        type: Number
    },
    commentAnserws: { 
        type: Array
    }

*/

const CardMovie = ({ moviesData }) => {

  const navigate = useNavigate();
  const [addresseeId, setAddresseeId] = useState("")
  const [date, setDate] = useState("")
  const [recomendationId, setRecomendationId] = useState("")
  const [comment, setComment] = useState("")
  



  const goTo = (category) => {
    navigate(`/movies/${category}`);
  };

  const sendComment = () => { 
    const commentData = ({ 
      
    })
  }

  return (
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto">
        {moviesData.map((mov) => (
            <div key={mov._id} className="w-full ">
            <Card
                isFooterBlurred
                className="w-[260px] h-[300px] col-span-12 sm:col-span-7"
                style={{
                backgroundImage: `url(${mov.movieImage})`,
                backgroundSize: "cover",
                }}
            >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                 <div className="flex justify-between  w-full">
                   <h4 className="text-white font-bold text-xl">{mov.title}</h4>
                   <Dropdown>
                        <DropdownTrigger>
                            <small  variant="bordered" className="cursor-pointer text-md text-white"> ... </small>
                        </DropdownTrigger>
                        <DropdownMenu >
                            <DropdownItem key="new">
                                   <p>Comentar</p>
                                </DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                 </div>
                </CardHeader>
                <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src="/images/card-example-5.jpeg"
                />
                <CardFooter className="absolute mt-8 bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image  alt="Breathing app icon" className="rounded-full w-10 h-11 bg-black" src={mov.userProfileImage} />
                        <div className="flex flex-col justify-start text-start">
                            <p className="text-tiny text-white/60">{mov.platform}</p>
                            <p className="text-tiny text-white/60">{mov.duration} minutes</p>
                            <p className="text-tiny text-white/60">See author's review</p>
                        </div>
                    </div>
                 <Button radius="full" className="font-bold text-black" size="sm" onClick={() => goTo(`${mov.category}`)}> {mov.category} </Button>                         
                </CardFooter>
            </Card>
          
            </div>
        ))}
      </div>
    
  
  );
};

export default CardMovie;