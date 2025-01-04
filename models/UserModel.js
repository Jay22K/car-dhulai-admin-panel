const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: false,
        default: null
    },
    lastname: {
        type: String,
        required: false,
        default: null
    },
    username: {
        type: String,
        required: false,
        default: null
    },
    country_code: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    is_verified: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }
);


module.exports = mongoose.model('User', userSchema);
