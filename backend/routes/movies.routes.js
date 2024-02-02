import express from 'express';
const movieRoutes = express.Router();

/*
import  {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    login
} from '../controllers/userController.js' */


// Routes:
movieRoutes.get('/allMovies', );
movieRoutes.get('/:movieId', );
movieRoutes.put('/:userId/:movieId', );
movieRoutes.post('/newRecomendation', );
movieRoutes.delete('/:userId/:movieId', );


export default movieRoutes;