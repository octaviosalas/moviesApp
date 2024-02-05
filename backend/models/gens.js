import mongoose from "mongoose";


const gensSchema = mongoose.Schema({ 
    name: { 
        type: String
    }, 
    image: { 
        type: String
    }
   
})

const gens = mongoose.model("gens", gensSchema)

export default gens;

