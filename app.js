const express = require('express');
const routerApi = require('./routes');
const compression = require('compression');

const app = express();

//Engine for create the front view from the server-side
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//Statics elements will be search in this folder
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//This will compress the all the text that is send to clients
app.use(compression());

const APPVERSION = 'v1';

//ROUTES
routerApi(app, APPVERSION);

module.exports = app;