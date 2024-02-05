import express from 'express';
const movieRoutes = express.Router();

import  {
    getAllRecomendations,
    getRecomendationById,
    deleteRecomendation,
    createNewRecomendation,
    updateRecomendation
} from '../controllers/movies.controllers.js' 

movieRoutes.get('/allMovies', getAllRecomendations);
movieRoutes.get('/:movieId', getRecomendationById);
movieRoutes.put('/:userId/:recomendationId', updateRecomendation);
movieRoutes.post('/newRecomendation', createNewRecomendation);
movieRoutes.delete('/:userId/:movieId', deleteRecomendation);


export default movieRoutes;