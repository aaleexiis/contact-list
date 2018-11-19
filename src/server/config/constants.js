module.exports = {
    'production' : {
        'mongoURL' : 'mongodb://ds027771.mlab.com:heroku_l85tzh5n@ds027771.mlab.com:27771/heroku_l85tzh5n'
    },
    'development' : {
        'mongoURL' : 'mongodb://127.0.0.1:27017/ContactList'
    },
    'test' : {
        'mongoURL' : 'mongodb://127.0.0.1:27017/ContactListTest'
    }
};
