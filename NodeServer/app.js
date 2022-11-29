const express = require('express');
const routerApi = require('./routes');

const app = express();

//Engine for create the front view from the server-side
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//Statics elements will be search in this folder
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

const APPVERSION = 'v1';

routerApi(app, APPVERSION);

module.exports = app;
