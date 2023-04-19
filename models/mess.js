const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    phone: {
        type: String,
        required: false
    },
    subscribers: {
        type: []
    }
});

const Mess = mongoose.model('Mess', messSchema);
Mess.createIndexes();
module.exports = Mess;