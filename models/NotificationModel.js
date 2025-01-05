const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deviceId: {
        type: String,
        required: true
    },
    registrationToken: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
},

    { timestamps: true });
module.exports = mongoose.model('Notification', notificationSchema);