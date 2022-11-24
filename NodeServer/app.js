const express = require('express');
const dotenv = require('dotenv');

//Routes
const recipeRouter = require('./routes/recipeRoutes');
const ingredientRouter = require('./routes/ingredientRoutes');
const viewRouter = require('./routes/viewsRouter');

const app = express();

//Engine for create the front view from the server-side
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//Statics elements will be search in this folder
app.use(express.static(`${__dirname}/public`));

app.use(express.json());

const APPVERSION = 'v1';

//Front Routes
app.use('/', viewRouter);

//API Routes
//This are also middlewares but applied just to the resource/URL that I'm espicifying
app.use(`/api/${APPVERSION}/recipe`, recipeRouter);
app.use(`/api/${APPVERSION}/ingredient`, ingredientRouter);
//The following middleware will onlybe reach after not matching the previous ones
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl}`,
  });
});
module.exports = app;
