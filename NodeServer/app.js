const express = require('express');
const dotenv = require('dotenv');

//Routes
const recipeRouter = require('./routes/recipeRoutes');
const ingredientRouter = require('./routes/ingredientRoutes');

const app = express();

app.use(express.json());

const APPVERSION = 'v1';

//Routes
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
