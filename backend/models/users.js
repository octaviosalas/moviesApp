import mongoose from "mongoose";


const usersSchema = mongoose.Schema({ 
    email: { 
        type: String
    }, 
    name: { 
        type: String
    }, 
    password: { 
        type: String
    },    
    photo: { 
        type: String
    },   
})

const Users = mongoose.model("users", usersSchema)

export default Users;

