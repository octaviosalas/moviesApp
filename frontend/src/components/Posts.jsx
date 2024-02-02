import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import CardMovie from './CardMovie'

const Posts = ({movies}) => {

    return (
    <div className='flex flex-col text-center items-center justify-center'>
         <CardMovie moviesData={movies}/>
    </div>
  )
}

export default Posts
