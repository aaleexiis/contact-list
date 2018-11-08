require('module-alias/register');

const winston = require('winston');
const http = require('http');

const ContactListAPI = require('@ContactListAPI');
const ContactListServer = http.Server(ContactListAPI);
const ContactListPORT = process.env.PORT;
const LOCAL = '0.0.0.0';

ContactListServer.listen(ContactListPORT, LOCAL, () => {
    winston.info(`ContactListAPI running on ${ContactListPORT}`);
});
