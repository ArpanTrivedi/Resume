const mongoose = require("mongoose");

const resumeSchema =  new mongoose.Schema({
    firstname: {
        type: String,
        minLength: 3,
        maxLength: 32,
        trim: true,
        required: true
    },
    lastname: { 
        type: String,
        maxLength: 32,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        minLength: 10,
        maxLength: 11,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    cv: {
        data: Buffer,
        contentType: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema);