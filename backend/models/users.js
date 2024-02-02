import mongoose from "mongoose";


const usersSchema = mongoose.Schema({ 
    email: { 
        type: Number
    }, 
    password: { 
        type: String
    },    
    photo: { 
        type: String
    },   
})

const users = mongoose.model("users", usersSchema)

export default users;

