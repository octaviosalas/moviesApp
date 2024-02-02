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
    }
})

const Recomendations = mongoose.model("recomendations", recomendationsSchema)

export default Recomendations;

