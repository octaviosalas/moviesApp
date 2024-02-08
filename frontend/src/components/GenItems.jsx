import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import CardMovie from './CardMovie'
import CardGen from './CardGen'



const GenItems = () => {

  const [gens, setGens] = useState([])
  const [movies, setMovies] = useState([])
  const [data, setData] = useState([])

  const getMovies = () => { 
    axios.get("http://localhost:4000/movies/allMovies")
    .then((res) => { 
        const data = res.data
        const generalMoviesWithOutGroup = data.filter((movies) => !movies.groupId)
        console.log(res.data)
        setMovies(generalMoviesWithOutGroup)
    })
    .catch((err) => { 
        console.log(err)
    })
}

  const getAllGens = () => { 
    axios.get("http://localhost:4000/gens/allGens")
         .then((res) => { 
          console.log(res.data)
          setGens(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  const genQuantityMoviesByGen = () => { 
    const getData =  gens.map((g) => { 
      const filteredMovies = movies.filter((m) => m.category === g.name)
      const quantity = filteredMovies.length
      return { 
        gen: g.name,
        quantity: quantity,
        image: g.image
      }
    })
    console.log(getData)
    return getData
  } 

  useEffect(() => { 
    getMovies()
    getAllGens()
  }, [])

  useEffect(() => { 
    genQuantityMoviesByGen()
    setData(genQuantityMoviesByGen())
  }, [movies, gens])
  

    return (
        <div className='flex flex-col text-center items-center justify-center'>
           <CardGen allGens={data}/>
        </div>
  )
}

export default GenItems
