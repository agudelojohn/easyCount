const recipeRouter = require('./recipeRoutes');
const ingredientRouter = require('./ingredientRoutes');
const viewRouter = require('./viewsRouter');
const userRouter = require('./usersRouter');

//API Routes
//This are also middlewares but applied just to the resource/URL that I'm espicifying
const routesApi = (app, appVersion) => {
  app.use(`/`, viewRouter);
  app.use(`/api/${appVersion}/recipe`, recipeRouter);
  app.use(`/api/${appVersion}/ingredient`, ingredientRouter);
  app.use(`/api/${appVersion}/secure/user`, userRouter);
  //The following middleware will onlybe reach after not matching the previous ones
  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Cant find ${req.originalUrl}`,
    });
  });
};

module.exports = routesApi;
