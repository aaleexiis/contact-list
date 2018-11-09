require('module-alias/register');
const expect = require('chai').expect;
const request = require('supertest');
const chai = require("chai");
chai.should();
chai.use(require('chai-things'));

const app = require('@ContactListAPI');
const {Contact} = require('./../../app/setup');
const {ObjectID} = require('mongodb');

describe('# Contact API integration tests', function(){
    let mockContacts = [
        {
            name: 'Ana',
            surname: 'Banana',
            email: 'ana@gmail.com',
            favourite: true,
            phone: [{
                label: 'mobile',
                number: '+385911234567'
            }]
        },
        {
            name: 'Iva',
            surname: 'Sljiva',
            email: 'iva@gmail.com',
            favourite: false,
            phone: [{
                label: 'mobile',
                number: '+385911234567'
            }]
        },
        {
            name: 'Mala',
            surname: 'Maca',
            email: 'maca@gmail.com',
            favourite: false,
            phone: [ {
                label: 'home',
                number: '+38511234567'
            }]
        }
    ];

    before((done) => {
        Contact.remove({}).then(() => {
            Contact.create(mockContacts, (err, contacts) => {
                if (err) {
                    return done(err);
                }

                done();
            });
        });
    });

    after((done) => {
        Contact.remove({}).then(() => {
            done();
        });
    });

    describe('## POST /api/v1/contacts/setup', () => {
        it('should create one mock contact', (done) => {
            request(app)
                .post('/api/v1/contacts/setup')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    Contact.find({ email: 'brokula.zeljko@gmail.com'}).then((contact) => {
                        expect(contact).to.not.equal(null);
                        done();
                    }).catch((e) => done(e));
                });
        });
    });

    describe('## GET /api/v1/contacts', () => {
        let validContactID = null;
        let validContactName = null;
        let validContactSurname = null;
        let validContactEmail = null;
        let validContactFavouriteFlag = false;
        let validContactPhone = null;

        before((done) => {
            Contact.findOne({}, (err, contact) => {
                if (err) {
                    return done(err);
                }

                validContactID = contact._id;
                validContactName = contact.name;
                validContactSurname = contact.surname;
                validContactEmail = contact.email;
                validContactFavouriteFlag = contact.favourite;
                validContactPhone = contact.phone;

                done();
            });
        });

        it('should return all contacts', function (done) {
            request(app)
                .get('/api/v1/contacts')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array').that.has.length(4);
                    done();
                });
        });

        it('should return 400 if only id is provided and id is invalid ObjectID', (done) => {
            request(app)
                .get('/api/v1/contacts' + '?id=aaaaa')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 400 if id and email are provided and id is invalid ObjectID', (done) => {
            request(app)
                .get('/api/v1/contacts' + '?id=aaaaa&email=ana@gmail.com')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return contact if only valid id is provided', (done) => {
            request(app)
                .get(`/api/v1/contacts?id=${validContactID}`)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array').that.has.length(1);
                    expect(res.body.data[0]._id).to.equal(validContactID.toString());
                    expect(res.body.data[0].name).to.equal(validContactName.toString());
                    expect(res.body.data[0].surname).to.equal(validContactSurname.toString());
                    expect(res.body.data[0].email).to.equal(validContactEmail.toString());
                    expect(res.body.data[0].favourite).to.equal(validContactFavouriteFlag);
                    expect(res.body.data[0].phone).to.be.an('array').that.has.length(1);
                    done();
                });
        });

        it('should return contact if only email is provided', (done) => {
            request(app)
                .get(`/api/v1/contacts?email=${validContactEmail}`)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array').that.has.length(1);
                    expect(res.body.data[0]._id).to.equal(validContactID.toString());
                    expect(res.body.data[0].name).to.equal(validContactName.toString());
                    expect(res.body.data[0].surname).to.equal(validContactSurname.toString());
                    expect(res.body.data[0].email).to.equal(validContactEmail.toString());
                    expect(res.body.data[0].favourite).to.equal(validContactFavouriteFlag);
                    expect(res.body.data[0].phone).to.be.an('array').that.has.length(1);
                    done();
                });
        });

        it('should return contact if valid id and email are provided', (done) => {
            request(app)
                .get(`/api/v1/contacts?id=${validContactID}&email=${validContactEmail}`)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('array').that.has.length(1);
                    expect(res.body.data[0]._id).to.equal(validContactID.toString());
                    expect(res.body.data[0].name).to.equal(validContactName.toString());
                    expect(res.body.data[0].surname).to.equal(validContactSurname.toString());
                    expect(res.body.data[0].email).to.equal(validContactEmail.toString());
                    expect(res.body.data[0].favourite).to.equal(validContactFavouriteFlag);
                    expect(res.body.data[0].phone).to.be.an('array').that.has.length(1);
                    done();
                });
        });
    });

    describe('## POST /api/v1/contacts/modify', () => {
        let validContactID = null;
        let validContactName = null;

        before((done) => {
            Contact.findOne({}, (err, contact) => {
                if (err) {
                    return done(err);
                }

                validContactID = contact._id;
                validContactName = contact.name;

                done();
            });
        });

        it('should return 400 if contact id was not provided in the request', (done) => {
            request(app)
                .post('/api/v1/contacts/modify')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 400 if the provided contat id is an invalid ObjectID', (done) => {
            request(app)
                .post('/api/v1/contacts/modify')
                .send({
                    id: 'aaa'
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 400 if the contact does not exist', (done) => {
            request(app)
                .post('/api/v1/contacts/modify')
                .send({
                    id: new ObjectID()
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 200 if the contact exists', (done) => {
            let newName = 'Mandarina';
            Contact.findOne({ _id: validContactID }, (err, contact) => {
                if (err) {
                    return done(err);
                }

                let originalName = contact.name;
                expect(originalName).to.equal(validContactName);

                request(app)
                    .post('/api/v1/contacts/modify')
                    .send({
                        id: validContactID,
                        name: newName
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        expect(res.statusCode).to.equal(200);
                        expect(res.body.success).to.equal(true);
                        Contact.findOne({ _id: validContactID }, (err, contact) => {
                            if (err) {
                                return done(err);
                            }

                            let modifiedName = contact.name;
                            expect(originalName).to.not.equal(modifiedName);
                            expect(modifiedName).to.equal(newName);
                            done();
                        });
                    });
            });
        });
    });

    describe('## DELETE /api/v1/contacts/delete/:id', () => {
        let validContactID = null;

        before((done) => {
            Contact.findOne({}, (err, contact) => {
                if (err) {
                    return done(err);
                }

                validContactID = contact._id;
                done();
            });
        });

        it('should return 400 if the ObjectID is invalid', (done) => {
            request(app)
                .delete('/api/v1/contacts/delete/' + 'aaaa')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 400 if the contact doesn\'t exist', (done) => {
            request(app)
                .delete('/api/v1/contacts/delete/' + new ObjectID())
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res.statusCode).to.equal(400);
                    expect(res.body.success).to.equal(false);
                    done();
                });
        });

        it('should return 200 if the contact exists', (done) => {
            Contact.findById(validContactID, (err, user) => {
                if (err) {
                    return done(err);
                }

                expect(user).to.exist;
                request(app)
                    .delete('/api/v1/contacts/delete/' + validContactID)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        expect(res.statusCode).to.equal(200);
                        expect(res.body.success).to.equal(true);
                        Contact.findById(validContactID, (err, contact) => {
                            if (err) {
                                return done(err);
                            }

                            expect(contact).to.not.exist;
                            done();
                        });
                    });
            });
        });
    });
});