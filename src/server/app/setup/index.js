//models are loaded before anything else in app
const mongoose = require('mongoose');
const ContactModel = require('@ContactListModels/contact');

const models = {
    Contact: mongoose.model('Contact')
};

module.exports = models;
