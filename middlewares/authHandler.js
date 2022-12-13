const boom = require('@hapi/boom');

exports.checkApiKey = async (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    next(boom.unauthorized('Sorry, you are not authorized'));
  }
};
