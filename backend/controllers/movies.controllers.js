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
    const { movieId } = req.params;
    const {category, title, duration, userName, UserEmail, platform, score, date} = req.body
  
  
    try {
          Recomendations.findByIdAndUpdate({ _id: movieId }, { 
                category: category,
                title: title,
                duration: duration,
                userName: userName,
                UserEmail: UserEmail,
                platform: platform,
                score: score,
                date: date
            })
            .then((newMovie) => {                                      
            res.json({message:"The Publication was removed of Favorites", newMovie})
            })
            .catch((err) => { 
            console.log(err)
            })
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  

  export const deleteRecomendation = async (req, res) => {
    const { movieId } = req.params;
  
    try {
      const deletedRecomendation = await Recomendations.findByIdAndDelete(movieId);
  
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