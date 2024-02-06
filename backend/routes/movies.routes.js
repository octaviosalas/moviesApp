import express from 'express';
const movieRoutes = express.Router();

import  {
    getAllRecomendations,
    getRecomendationById,
    deleteRecomendation,
    createNewRecomendation,
    updateRecomendation,
    removeLike
} from '../controllers/movies.controllers.js' 

movieRoutes.get('/allMovies', getAllRecomendations);
movieRoutes.get('/:movieId', getRecomendationById);
movieRoutes.put('/update/:recomendationId', updateRecomendation);
movieRoutes.put('/removeLike/:recomendationId', removeLike);
movieRoutes.post('/newRecomendation', createNewRecomendation);
movieRoutes.delete('/:userId/:movieId', deleteRecomendation);


export default movieRoutes;