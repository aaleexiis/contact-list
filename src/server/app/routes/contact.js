const config = require('@config');
const models = require('@ContactList/app/setup');

module.exports = (app) => {
    const api = app.server.app.api.contact;

    /**
     * Endpoint creates one fake contact.
     */
    app.route('/api/v1/contacts/setup')
        .post(api.setup(models.Contact));

    /**
     * Endpoint creates new contact.
     */
    app.route('/api/v1/contacts/create')
        .post(api.create(models.Contact));

    /**
     * Endpoint retrieves list of all contacts which meet the set criteria.
     * If no param is provided all contacts are retrieved.
     */
    app.route('/api/v1/contacts')
        .get(api.getContacts(models.Contact));

    /**
     * Endpoint modifies existing contact
     */
    app.route('/api/v1/contacts/modify')
        .post(api.modify(models.Contact));

    /**
     * Endpoint deletes contact with given id
     */
    app.route('/api/v1/contacts/delete/:id')
        .delete(api.delete(models.Contact));
};