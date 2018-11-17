const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const winston = require('winston');
const dotenv = require('dotenv').config();
const models = require('@ContactList/app/setup');

const config = require('./index.js');
const database = require('./database')(mongoose, config);

//configure logging
winston.configure({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transports: [
        new winston.transports.Console()
    ]
});

app.use(express.static(__dirname + "/../../client/dist"));
app.set('appPath', __dirname + "/../../client/dist");
app.get('/', (req, res) => res.sendfile(app.get('appPath') + '/index.html'));
app.use(express.static('.'));
//extend limit because of images
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan('dev'));
app.use(cors());

consign({ cwd: 'src' })
    .include('server/app/setup') //models are loaded before anything else
    .then('server/app/api') //api methods
    .then('server/app/routes') //routes
    .into(app);

module.exports = app;
