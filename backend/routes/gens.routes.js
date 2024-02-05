import express from 'express';
const genRoutes = express.Router();

import  {
    getAllGens,
} from '../controllers/gens.controllers.js' 

genRoutes.get('/allGens', getAllGens);

export default genRoutes;