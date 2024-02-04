import mongoose from "mongoose";


const commentsSchema = mongoose.Schema({ 
    addresseeId: { 
        type: String
    }, 
    creatorId: { 
        type: String
    },
    date: { 
        type: String
    },
    recomendationId: { 
        type: String
    },
    comment: { 
        type: String
    },
    commentsLike: { 
        type: Number
    },
    commentAnserws: { 
        type: Array
    }

})

const comments = mongoose.model("comments", commentsSchema)

export default comments;

