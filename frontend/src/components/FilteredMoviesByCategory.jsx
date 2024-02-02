import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import CardMovie from './CardMovie';
import Posts from './Posts';


const FilteredMoviesByCategory = () => {

    const { category } = useParams();
    const [filteredMovies, setFilteredMovies] = useState([])

    const getMovies = () => { 
        axios.get("http://localhost:4000/movies/allMovies")
        .then((res) => { 
            console.log(res.data)
            const all = res.data
            const filterByCategory = all.filter((mov) => mov.category === category)
            setFilteredMovies(filterByCategory)
            console.log(filterByCategory)
        })
        .catch((err) => { 
            console.log(err)
        })
    }

    useEffect(() => { 
        getMovies()
    }, [category])

  return (
    <div className='flex flex-col text-center items-center justify-center'>
      <Posts movies={filteredMovies} />
    </div>
  )
}

export default FilteredMoviesByCategory
