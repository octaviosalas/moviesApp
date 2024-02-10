import Notifications from "../models/notifications.js";

export const saveInvitation = async (req, res) => {
  try {
    const {
      notificationType,
      senderName,
      senderId,
      senderProfileImage,
      groupId,
      groupName,
      groupMembers,
      addresseeId,
      addresseeName,
    } = req.body.notificationsData;

    const newNotification = new Notifications({
      notificationType,
      senderName,
      senderId,
      senderProfileImage,
      groupId,
      groupName,
      groupMembers,
      addresseeId,
      addresseeName,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar Notificacion' });
    console.log(error);
  }
};

export const getUserNotifications = async (req, res) => { 
   const {userId} = req.params
   console.log(userId)
  try {
    const notificationUser = await Notifications.find({addresseeId: userId});
    if (!notificationUser) {
      return res.status(404).json({ message: 'Notificaciones no encontradas' });
    }
    res.status(200).json(notificationUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el Notificaciones' });
  }
}


export const updateNotificationState = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notificationResponse = await Notifications.findByIdAndUpdate(
      { _id: notificationId },
      { read: true, invitationStatus: "acepted" },
      { new: true } 
    );

    if (!notificationResponse) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    res.status(200).json(notificationResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la notificación' });
  }
};

export const updateInvitationRejected = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notificationResponse = await Notifications.findByIdAndUpdate(
      { _id: notificationId },
      { read: true, invitationStatus: "rejected" },
      { new: true } 
    );

    if (!notificationResponse) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    res.status(200).json(notificationResponse);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la notificación' });
  }
};
