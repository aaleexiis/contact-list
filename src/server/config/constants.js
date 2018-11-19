module.exports = {
    'production' : {
        'mongoURL' : 'mongodb://heroku_l85tzh5n:fr59jbhisftq3h4sgvqbj7u09a@ds027771.mlab.com:27771/heroku_l85tzh5n'
    },
    'development' : {
        'mongoURL' : 'mongodb://127.0.0.1:27017/ContactList'
    },
    'test' : {
        'mongoURL' : 'mongodb://127.0.0.1:27017/ContactListTest'
    }
};
