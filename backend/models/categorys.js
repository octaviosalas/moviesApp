import mongoose from "mongoose";


const categorysSchema = mongoose.Schema({ 
    type: { 
        type: String
    }, 
})

const category = mongoose.model("category", categorysSchema)

export default category;

