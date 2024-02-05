import React, { useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import CreateComment from "./CreateComment";
import CreateRecomendation from "./CreateRecomendation";
import { Link } from "react-router-dom";


const CardMovieIndividual = ({ moviesData }) => {

  const navigate = useNavigate();
  const [addresseeId, setAddresseeId] = useState("")
  const [date, setDate] = useState("")
  const [recomendationId, setRecomendationId] = useState("")
  const [comment, setComment] = useState("")
  
  const goTo = (category) => {
    navigate(`/movies/${category}`);
  };



  return (
   
  <>
   {moviesData.map((mov) => (
            <div key={mov._id} className="w-full ">
            <Card
                isFooterBlurred
                className="w-[600px] h-[400px] 2xl:w-[380px] 2xl:h-[650px] col-span-12 sm:col-span-7 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${mov.movieImage})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
            >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                 <div className="flex justify-between  w-full">
                   <h4 className="text-white font-bold text-xl">{mov.title}</h4>
                  
                 </div>
                </CardHeader>
              
                <CardFooter className="absolute mt-8 bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 h-24">
                    <div className="flex flex-grow gap-2 items-center">
                        <Image  alt="Breathing app icon" className="rounded-full w-16 h-16 bg-black" src={mov.userProfileImage} />
                        <div className="flex flex-col justify-start text-start">
                            <p className="text-xs xl:text-sm text-white/60">{mov.platform}</p>
                            <p className="text-xs xl:text-sm text-white/60">{mov.duration} minutes</p>
                            <p className="text-xs xl:text-sm text-white/60">{mov.date}</p>
                        </div>
                    </div>
                        <Link to={`/movie/${mov._id}`}>
                            <Button radius="full" className="font-bold text-black" size="sm" onClick={() => goTo(`${mov.category}`)}> Ver </Button>
                        </Link>                    
                </CardFooter>
            </Card>
          
            </div>
        ))}
    
  </>
   
    
  
  );
};

export default CardMovieIndividual;