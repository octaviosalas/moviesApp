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
    const allGroups = await groups.find();
    const myGroups = allGroups.filter(group => group.members.some(member => member.userId === userId));

    res.status(200).json(myGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const addNewMember = async (req, res) => { 
  const {groupId} = req.params
  const newMemberData = req.body;

  console.log("Recibi como ID del grupo: ", groupId)
  console.log("Recibi como nuevo miembro: ", newMemberData)

  try {
    const group = await groups.findById({_id: groupId});
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
    group.members.push(newMemberData);
    const updatedGroup = await group.save();
    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const groupData = async (req, res) => { 
  const {groupId} = req.params


  try {
    const group = await groups.findById({_id: groupId});
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }
     await group
     res.status(200).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


export const updateMemberRol = async (req, res) => {
  const { userId, groupId } = req.params;

  console.log("Recibí como ID del grupo: ", groupId);
  console.log("Recibí como miembro: ", userId);

  try {
    const group = await groups.findById({_id: groupId});

    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    const memberIndex = group.members.findIndex(member => member.userId === userId);

    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado en el grupo' });
    }

    group.members[memberIndex].userRolGroup = 'Admin';
    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};