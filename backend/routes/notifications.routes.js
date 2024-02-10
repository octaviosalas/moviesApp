import express from 'express';
const notificationsRoutes = express.Router();


import  {
    saveInvitation,
    getUserNotifications,
    updateNotificationState,
    updateInvitationRejected
} from '../controllers/notifications.controllers.js' 


notificationsRoutes.get('/:userId', getUserNotifications);
notificationsRoutes.post('/invitation', saveInvitation);
notificationsRoutes.put('/:notificationId', updateNotificationState);
notificationsRoutes.put('/reject/:notificationId', updateInvitationRejected);





export default notificationsRoutes;