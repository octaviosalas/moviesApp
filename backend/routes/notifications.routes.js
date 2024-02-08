import express from 'express';
const notificationsRoutes = express.Router();


import  {
    saveInvitation,
    getUserNotifications,
    updateNotificationState
} from '../controllers/notifications.controllers.js' 


notificationsRoutes.get('/:userId', getUserNotifications);
notificationsRoutes.post('/invitation', saveInvitation);
notificationsRoutes.put('/:notificationId', updateNotificationState);




export default notificationsRoutes;