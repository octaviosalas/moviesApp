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

const CardGen = ({ allGens }) => {

  const navigate = useNavigate();
 
  const goTo = (category) => {
    navigate(`/movies/${category}`);
  };

 

  return (
   
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto">
        {allGens.map((mov) => (
            <div key={mov._id} className="w-full ">
            <Card
                onClick={() => goTo(mov.gen)}
                isFooterBlurred
                className="w-[260px] h-[300px] col-span-12 sm:col-span-7 bg-cover bg-center  cursor-pointer"
                style={{
                backgroundImage: `url(${mov.image})`,
                backgroundSize: "cover",
                }}
            >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                 <div className="flex justify-between  w-full">
                   <h4 className="text-white hover:text-violet-600 font-bold text-xl">{mov.gen}</h4>
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
                  {/*      <Image  alt="Breathing app icon" className="rounded-full w-10 h-11 bg-black" src={mov.userProfileImage} /> */}
                        <div className="flex flex-col justify-start text-start">
                            <p className="text-tiny text-white/60">{mov.quantity} {mov.quantity === 1 ? " Recomendacion" : " Recomendaciones"}</p>                          
                        </div>
                    </div>
                   <Button radius="full" className="font-bold text-black" size="sm" onClick={() => goTo(mov.gen)}> Ver </Button>                         
                </CardFooter>
            </Card>
          
            </div>
        ))}
      </div>
    
  
  );
};

export default CardGen;