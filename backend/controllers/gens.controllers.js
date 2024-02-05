import gens from "../models/gens.js";

export const getAllGens = async (req, res) => { 
    try {
        const genes = await gens.find();
        res.status(200).json(genes);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los generos' });
      }
}