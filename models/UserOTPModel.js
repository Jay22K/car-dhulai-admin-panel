const mongoose = require("mongoose");
const UserOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false,
        default: null
    },
    country_code: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    OTP: {
        type: Number
    }
}, { timestamps: true }
);


module.exports = mongoose.model('UserOTP', UserOTPSchema);