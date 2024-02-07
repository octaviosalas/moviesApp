import groups from "../models/groups.js";

export const createGroup = async (req, res) => {  

    console.log(req.body)
 
    try {
      const newGroupRecomendation = new groups(req.body);
      const savedNewReco = await newGroupRecomendation.save();
      res.status(201).json(savedNewReco);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la recomendaicon' });
      console.log(error)
    }
}

export const getMyGroups = async (req, res) => { 
  try {
    const { userId } = req.params;

    // Recupera todos los grupos desde la base de datos
    const allGroups = await groups.find();

    // Filtra los grupos donde el usuario es miembro
    const myGroups = allGroups.filter(group => group.members.some(member => member.userId === userId));

    res.status(200).json(myGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
