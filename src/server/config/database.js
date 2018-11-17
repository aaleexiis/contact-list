const winston = require('winston');

module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    },function(){
        /* Drop the DB */
        mongoose.connection.db.dropDatabase();
    });

    database.on('error', error => winston.error(`Connection to ContactList database failed: ${error}`));
    database.on('connected', () => winston.info('Connected to ContactList database'));
    database.on('disconnected', () => winston.info('Disconnected from ContactList database'));

    process.on('SIGINT', () => {
        database.close(() => {
            winston.info('ContactList terminated, connection closed');
            process.exit(0);
        })
    });
};