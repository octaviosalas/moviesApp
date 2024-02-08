import mongoose from "mongoose";

const notificationsSchema = mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderProfileImage: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  groupMembers: [
    {
      userName: String,
      userId: String,
      userEmail: String,
      userProfileImage: String,
      userRolGroup: String,
      _id: String,
    },
  ],
  addresseeId: {
    type: String,
    required: true,
  },
  addresseeName: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  invitationStatus: {
    type: String,
    default: 'pending',
  },
});

const Notifications = mongoose.model('Notifications', notificationsSchema);

export default Notifications