import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import CardMovie from './CardMovie';
import Posts from './Posts';
import NavBarComponent from './Navbar';
import Search from './Search';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const FilteredMoviesByCategory = () => {

    const { category } = useParams();
    const [filteredMovies, setFilteredMovies] = useState([])
    const [withOutMovies, setWithOutMovies] = useState(false)
    const [load, setLoad] = useState(true)

    const getMovies = () => { 
        axios.get("http://localhost:4000/movies/allMovies")
        .then((res) => { 
            console.log(res.data)
            const all = res.data      
              const filterByCategory = all.filter((mov) => mov.category === category)
              if(filterByCategory.length !== 0) { 
                setFilteredMovies(filterByCategory)
                setLoad(false)
                console.log(filterByCategory)
              } else { 
                setWithOutMovies(true)
                setLoad(false)
              }
                       
        })
        .catch((err) => { 
            console.log(err)
        })
    }

    useEffect(() => { 
        getMovies()
    }, [category])

    const handleChange = (e) => { 
      const searchTerm = e.toLowerCase(); 
      const filteringFilteredData = filteredMovies.filter((mov) => mov.title.toLowerCase().includes(searchTerm));
      if(e.length !== 0) { 
        setFilteredMovies(filteringFilteredData)
      } else { 
        getMovies()
      }   
      
    }

  return (
    <>
  
       <NavBarComponent updateMovies={getMovies}/>
        <div className='flex flex-col text-center items-center justify-center min-h-screen '>
          {load ? (
             <Loading text={"Cargando Categoria.."}/>
            ) : (   
          <>
     {withOutMovies ? (
      <div className='mt-12'>
        <p className='font-bold text-md'>Al momento, no hay recomendaciones para la categoría {category}</p>
        <Link to={"/main"}>
          <p className='text-violet-700 font-medium text-sm mt-6 underline'>Volver</p>
        </Link>
      </div>
       ) : (
      <div className='mt-24 lg:mt-20'>
        <div className='flex items-center justify-center'>
          <Search inputValue={handleChange}/>
        </div>
        <div className='mt-12'>
          <Posts movies={filteredMovies} />
        </div>
      </div>
    )}
  </>
)}
        </div>
    </>
  )
}

export default FilteredMoviesByCategory
