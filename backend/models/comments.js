import mongoose from "mongoose";


const commentsSchema = mongoose.Schema({ 
    addresseeId: { 
        type: String
    }, 
    creatorId: { 
        type: String
    },
    creatorName: { 
        type: String
    },
    creatorProfileImage: { 
        type: String,
    },
    creatorEmail: { 
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

const Comments = mongoose.model("comments", commentsSchema)

export default Comments;

