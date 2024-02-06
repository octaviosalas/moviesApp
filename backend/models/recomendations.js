import mongoose from "mongoose";


const recomendationsSchema = mongoose.Schema({ 
    userId: { 
        type: String
    }, 
    category: { 
        type: String
    },   
    title: { 
        type: String
    },  
    userProfileImage: { 
        type: String
    },
    duration: { 
        type: String
    },  
    userName: { 
        type: String
    },  
    UserEmail: { 
        type: String
    },  
    platform: { 
        type: String
    },  
    score: { 
        type: String
    },   
    date: { 
        type: String
    },  
    movieImage: { 
        type: String
    },
    observation: { 
        type: String
    },
    language: { 
        type: String
    },
    director: { 
        type: String,
        required: false
    },
    actors: { 
        type: String,
        required: false
    },
    likes: {
        type: [{ 
            date: String,
            userId: String,
            userName: String,
            userProfileImage: String,
            addresseeId: String,
        }],
        default: [],
    },
})

const Recomendations = mongoose.model("recomendations", recomendationsSchema)

export default Recomendations;