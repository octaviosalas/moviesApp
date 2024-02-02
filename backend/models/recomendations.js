import mongoose from "mongoose";


const recomendationsSchema = mongoose.Schema({ 
    codigo: { 
        type: Number
    }, 
    descripcion: { 
        type: String
    },    
})

const recomendations = mongoose.model("recomendations", recomendationsSchema)

export default recomendations;

