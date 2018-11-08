const mongoose = require('mongoose');

const phone = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const contact = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    favourite : {
        type: Boolean,
        required: true
    },
    phone : [phone]
}, {
    timestamps: true
});

mongoose.model('Contact', contact);