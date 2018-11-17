const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');
const winston = require('winston');
const _ = require('lodash');
var fs = require('fs');

const api = {};

//create contact
api.setup = (Contact) => (req, res) => {
    const contacts = [
        new Contact({
            name: 'Brokula',
            surname: 'Zeljko',
            email: 'brokula.zeljko@gmail.com',
            favourite: true,
            phone: [{
                label: 'mobile',
                number: '+385911234567'
            }, {
                label: 'home',
                number: '+38511234567'
            }]
        }),
        new Contact({
            name: 'Susjed',
            surname: 'Bobic',
            email: 'susjed.bobic@gmail.com',
            favourite: false,
            phone: [{
                label: 'mobile',
                number: '+385911111111'
            }, {
                label: 'home',
                number: '+38511222222'
            }]
        }),
        new Contact({
            name: 'Gospoda',
            surname: 'Cizmic',
            email: 'gospoda.cizmic@gmail.com',
            favourite: true,
            phone: [{
                label: 'home',
                number: '+385112333333'
            }]
        }),
        new Contact({
            name: 'Ujak',
            surname: 'Tomo',
            email: 'ujak.tomo@gmail.com',
            favourite: true,
            phone: [{
                label: 'mobile',
                number: '+385911234444'
            }, {
                label: 'home',
                number: '+38511234555'
            }]
        }),
        new Contact({
            name: 'Gospodin',
            surname: 'Mrkvic',
            email: 'gospodin.mrkvic@gmail.com',
            favourite: false,
            phone: [{
                label: 'home',
                number: '+38511234566'
            }]
        })
    ];
    Contact.create(contacts, (error) => {
        if (error) {
            winston.error(`Error while creating mock contacts. Error: ${error.message}`);
            res.status(400)
                .json({
                    success: false,
                    message: 'Error while creating mock contacts'
                });
        }
        winston.info('Contacts are successfully set up');
        res.status(200)
            .json({
            success: true,
            message: 'Contact are successfully set up'
        });
    });
};

/**
 * Create new contact and save it to database.
 * @param Contact schema which defines the shape of the contact documents within collection
 */
api.create = (Contact) => (req, res) => {
    const contact = new Contact(req.body);
    contact.save((error, newContact) => {
        if (error) {
            winston.error(`Error while creating new contact. Error: ${error.message}`);
            res.status(400)
                .json({
                    success: false,
                    message: 'Error while creating new contact'
                });
        }

        winston.info(`New contact is successfully created.`);
        res.status(200)
            .json({
                success: true,
                message: 'New contact is successfully created'
            });
    })
};

/**
 * Retrieves all contacts from database
 * @param Contact schema which defines the shape of the contact documents within collection
 */
api.getContacts = (Contact) => (req, res) => {
    const query = {
    };

    if (req.query.id) {
        if (!ObjectID.isValid(req.query.id)) {
            winston.error(`Error while retrieving contact from db. Invalid contact id.`);
            return res.status(400).json({
                success: false,
                message: 'Invalid contact id'
            });
        }
        query._id = req.query.id;
    }

    if (req.query.email) {
        query.email = req.query.email;
    }

    Contact.find(query, (error, data) => {
        if (error) {
            winston.error(`Error while retrieving contact from db. Error: ${error.message}`);
            return res.status(400).json({
                success: false,
                message: 'Error while retrieving contact from db'
            });
        }

        if (!data || _.isEmpty(data)) {
            winston.error(`Error while retrieving contact from db. No data.`);
            return res.status(204).send({
                success: false,
                message: 'No data'
            });
        }

        winston.info(`Contact successfully retrieved from db.`);
        return res.status(200).json({
            success: true,
            message: 'Contact successfully retrieved from db',
            data: data
        });
    });
};

/**
 * Update contact in database
 * @param Contact schema which defines the shape of the contact documents within collection
 */
api.modify = (Contact) => (req, res) => {
    if (!req.body.id) {
        winston.error(`Can not update contact. No id provided.`);
        return res.status(400).send({
            success: false,
            message: 'No id provided'
        });
    }

    if (!ObjectID.isValid(req.body.id)) {
        winston.error(`Can not update contact. Invalid id.`);
        return res.status(400).json({
            success: false,
            message: 'Invalid id'
        });
    }

    Contact.updateOne({ _id: req.body.id }, req.body, (error, result) => {
        if (error) {
            winston.error(`Error while updating contact. Error: ${error.message}`);
            return res.status(400).json({
                success: false,
                message: 'Error while updating contact'
            });
        }

        if (result.n === 0) {
            winston.error(`Error while updating contact. Contact does not exist.`);
            return res.status(400).send({
                success: false,
                message: 'Bulk operation does not exist'
            });
        }

        if (result.nModified === 0) {
            winston.info(`No changes were made while updating contact.`);
            return res.status(400).send({
                success: false,
                message: 'No changes were made'
            });
        }


        winston.info(`The contact is modified.`);
        res.status(200)
            .json({
                success: true,
                message: 'The contact is modified'
            });
    });
};

/**
 * Delete contact, with given id, from database
 * @param Contact schema which defines the shape of the contact documents within collection
 */
api.delete = (Contact) => (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        winston.error(`Error while deleting contact from db. Invalid id.`);
        return res.status(400).json({
            success: false,
            message: 'Invalid BulkOperation id'
        });
    }

    Contact.remove({ _id: req.params.id }, (error, result) => {
        if (error) {
            winston.error(`Error while deleting contact from db. Error: ${error.message}`);
            return res.status(400).json({
                success: false,
                message: 'Error while deleting contact from db'
            });
        }

        if (result.n === 0) {
            winston.error(`Error while deleting contact from db. Contact does not exist`);
            return res.status(400).send({
                success: false,
                message: 'Contact does not exist'
            });
        }

        winston.info(`The contact is deleted.`);
        res.status(200)
            .json({
                success: true,
                message: 'Contact is deleted'
            });

    });
};


module.exports = api;