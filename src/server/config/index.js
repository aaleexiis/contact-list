//globals
global.serverConstants = require('./constants');

const appStage = process.env.NODE_ENV;

module.exports = {
    session: {session: false},
    database: global.serverConstants[appStage]['mongoURL'] //db connection
};
