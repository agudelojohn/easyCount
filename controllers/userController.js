const boom = require('@hapi/boom');

const APIFeatures = require('./../utils/apiFeatures');
const User = require('./../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    //Here is where the query is really executed, that's why needs the AWAIT keyword
    const featuresOnQuery = new APIFeatures(User.find(), req.query);
    const data = await apiFeatures.queryToDB;
  } catch (err) {
    // TODO
  }
};
