import mongoose from "mongoose";


const groupsSchema = mongoose.Schema({ 
    groupName: { 
        type: String,
        required: true
    }, 
    creatorId: { 
      type: String
    },
    creatorName: { 
      type: String
    },
    members: [
        {
          userName: {
            type: String,
          },
          userId: {
            type: String,
          },
          userEmail: {
            type: String,
          },
          userProfileImage: {
            type: String, 
          },
          userRolGroup: { 
            type: String
          }
        },
    ],
    creationDate: {
        type: String,
        required: true
    },
    groupPhoto: { 
      type: String,
      required: true
    }
   
})

const groups = mongoose.model("groups", groupsSchema)

export default groups;

