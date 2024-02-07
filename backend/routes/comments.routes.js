import express from 'express';
const commentsRoutes = express.Router();

import  {
    saveNewComment,
    getPublicationComments,
    deleteComment
} from '../controllers/comments.controllers.js' 

commentsRoutes.post('/createComment', saveNewComment);
commentsRoutes.get('/publicationComments/', getPublicationComments);
commentsRoutes.delete("/:commentId", deleteComment)


export default commentsRoutes;