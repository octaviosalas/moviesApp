import Comments from "../models/comments.js";

export const getPublicationComments = async (req, res) => { 
  
  try {
    const allComments = await Comments.find();
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recomendaciones' });
  }
}

export const saveNewComment = async (req, res) => { 
  console.log(req.body)
  try {
    const newComment = new Comments(req.body);
    const newCommentary = await newComment.save();
    res.status(201).json(newCommentary);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear comentario' });
    console.log(error)
  }
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

  export const deleteComment = async (req, res) => {
 
     const {commentId} = req.params
     console.log(commentId)
     try {
      const deletedComment = await Comments.findByIdAndDelete({_id: commentId});
  
      if (deletedComment) {
        res.status(200).json({ message: 'Comentario eliminada correctamente', deleted: deletedComment });
      } else {
        res.status(404).json({ message: 'Comentario no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la recomendacion' });
    }
  }


