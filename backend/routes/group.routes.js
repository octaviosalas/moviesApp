import express from 'express';
const groupRoutes = express.Router();
import {createGroup, getMyGroups, addNewMember, groupData, updateMemberRol} from "../controllers/group.controllers.js"
import {getGroupPublications}  from "../controllers/movies.controllers.js"


groupRoutes.post('/create', createGroup);
groupRoutes.post('/addNewMember/:groupId', addNewMember);
groupRoutes.get('/getMyGroups/:userId', getMyGroups);
groupRoutes.get('/groupPublications/:groupId', getGroupPublications);
groupRoutes.get('/groupData/:groupId', groupData);
groupRoutes.put('/updateMember/:userId/:groupId', updateMemberRol);


export default groupRoutes;