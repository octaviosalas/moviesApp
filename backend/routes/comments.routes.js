import express from 'express';
const commentsRoutes = express.Router();

import  {
    saveNewComment,
    getPublicationComments
} from '../controllers/comments.controllers.js' 

commentsRoutes.post('/createComment', saveNewComment);
commentsRoutes.get('/publicationComments/', getPublicationComments);


export default commentsRoutes;