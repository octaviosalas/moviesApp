import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DemoCarousel = () => {

    const [bestMovies, setBestMovies] = useState([])
    const navigate = useNavigate()

    useEffect(() => { 
        axios.get("http://localhost:4000/movies/allMovies")
             .then((res) => { 
                console.log(res.data)
                const data = res.data
                const getBestScore = data.sort((a, b) => b.score - a.score).slice(0, 6)
                const getIdAndImage = getBestScore.map((data) => { 
                    return { 
                        image: data.movieImage,
                        recomendationId: data._id
                    }
                })
                setBestMovies(getIdAndImage)
                console.log(getIdAndImage)
             })
             .catch((err) => { 
                console.log(err)
             })
    }, [])

    const onChange = (index) => {
        console.log(`Carousel slide changed to index ${index}`);
    };

    const onClickItem = (index) => {
        console.log(`Clicked on item with index ${index}`);
    };

    const onClickThumb = (index) => {
        console.log(`Clicked on thumbnail with index ${index}`);
    };

    const viewMovieDetail = (recomendationId) => { 
        navigate(`/movie/${recomendationId}`)
    }

    return (
        <>
            <div className='flex justify-start'>
                <p className='font-medium text-black text-sm lg:text-md xl:text-xl'>Recomendaciones mejor puntuadas</p>
            </div>
            <div className='flex items-center justify-center mt-2'>
                <Carousel showArrows={true} onChange={onChange} showThumbs={false} onClickThumb={onClickThumb}>
                    {bestMovies.map((best) => ( 
                         <div className='h-[300px] lg:h-[450px] xl:h-[500px] 2xl:h-[520px] w-auto bg-violet-200 cursor-pointer' onClick={() => viewMovieDetail(best.recomendationId)}>
                            <img src={best.image} className=' w-full h-full'/>              
                        </div>
                    ))}
                 
                </Carousel>
            </div>  
        </>
      
    );
};

export default DemoCarousel;