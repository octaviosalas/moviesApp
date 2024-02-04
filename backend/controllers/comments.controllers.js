import comments from "../models/comments.js";

export const getPublicationComments = async (req, res) => { 
    
}

export const saveNewComment = async (req, res) => { 
   
}

export const createNewRecomendation = async (req, res) => {
 
    console.log(req.body)
  
    try {
      const newRec = new Recomendations(req.body);
      const savedRec = await newRec.save();
      res.status(201).json(savedRec);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
      console.log(error)
    }
  }