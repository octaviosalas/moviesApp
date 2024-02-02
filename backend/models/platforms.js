import mongoose from "mongoose";


const platformsSchema = mongoose.Schema({ 
    name: { 
        type: Number
    }, 
   
})

const platforms = mongoose.model("platforms", platformsSchema)

export default platforms;

