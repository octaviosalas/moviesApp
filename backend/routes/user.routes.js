import express from 'express';
const userRoutes = express.Router();

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
userRoutes.get('/', );
userRoutes.get('/:userId', );
userRoutes.put('/:userId', );
userRoutes.post('/createAccount', );
userRoutes.post("/login", )
userRoutes.delete('/:userId', );


export default userRoutes;