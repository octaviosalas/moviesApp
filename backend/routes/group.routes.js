import express from 'express';
const groupRoutes = express.Router();
import {createGroup, getMyGroups} from "../controllers/group.controllers.js"



groupRoutes.post('/create', createGroup);
groupRoutes.get('/getMyGroups/:userId', getMyGroups);



export default groupRoutes;