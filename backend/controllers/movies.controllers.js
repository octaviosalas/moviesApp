import recomendations from "../models/recomendations.js";

import Recomendations from "../models/recomendations.js";




export const getAllRecomendations = async (req, res) => {
    try {
      const recomendations = await Recomendations.find();
      res.status(200).json(recomendations);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las recomendaciones' });
    }
  }

export const getRecomendationById = async (req, res) => {
    const {movieId} = req.params
    try {
      const recomendations = await Recomendations.findById({_id: movieId})
      if (!recomendations) {
        return res.status(404).json({ message: 'Recomendacion no encontrado' });
      }
      res.status(200).json(recomendations);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la recomendacion' });
    }
  }


  export const createNewRecomendation = async (req, res) => {
 
    const {userId, category, title, duration, userName, UserEmail, userProfileImage, platform, score, date, movieImage, observation} = req.body
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


  export const updateRecomendation = async (req, res) => {
    const { recomendationId } = req.params;
    const { likedata } = req.body;

    console.log('Datos recibidos:', likedata);

    try {
        const updatedDocument = await Recomendations.findByIdAndUpdate(
            { _id: recomendationId },
            { $push: { likes: likedata } },
            { new: true } 
        );

        if (!updatedDocument) {
            return res.status(404).json({ error: "No se encontró la recomendación con el ID proporcionado." });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const removeLike = async (req, res) => {
  const { recomendationId } = req.params;
  const { userData } = req.body;

  console.log('Datos recibidos:', userData.userId);

  try {
      const updatedDocument = await Recomendations.findByIdAndUpdate(
          { _id: recomendationId },
          { $pull: { likes: { userId: userData.userId } } },
          { new: true } 
      );

      if (!updatedDocument) {
          return res.status(404).json({ error: "No se encontró la recomendación con el ID proporcionado." });
      }

      res.status(200).json(updatedDocument);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
};
  

  export const deleteRecomendation = async (req, res) => {
    const { recomendationId } = req.params;
     console.log(recomendationId)
    try {
      const deletedRecomendation = await Recomendations.findByIdAndDelete({_id: recomendationId});
  
      if (deletedRecomendation) {
        res.status(200).json({ message: 'Recomendacion eliminada correctamente', deleted: deletedRecomendation });
      } else {
        res.status(404).json({ message: 'Recomendacion no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la recomendacion' });
    }
  };

  export const getGroupPublications = async (req, res) => {
     const { groupId } = req.params;
     console.log(groupId)
    try {
      const groupRecomendations = await Recomendations.find({groupId: groupId});
  
      if (groupRecomendations) {
        res.status(200).json({ message: 'Recomendaciones del grupo', groupRecomendations});
      } else {
        res.status(404).json({ message: 'Grupo no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la recomendacion' });
    }
  };


  