const boom = require('@hapi/boom');

const APIFeatures = require('./../utils/apiFeatures');
const Ingredient = require('./../models/ingredientModel');

exports.getAllIngredients = async (req, res, next) => {
  try {
    //Here is where the query is really executed, that's why needs the AWAIT keyword
    const featuresOnQuery = new APIFeatures(Ingredient.find(), req.query)
      .filterData()
      .sortData()
      .limitFieldsData()
      .paginateData();
    const data = await featuresOnQuery.queryToDB;

    res.status(200).json({
      status: 'Sucess',
      data,
    });
  } catch (err) {
    next(boom.notFound('Not data for ingredients. ' + err.message));
  }
};

exports.getIngredient = async (req, res, next) => {
  try {
    const id = req.params.id;
    let query = Ingredient.findById(id);
    query = query.select('-__v ');
    const data = await query;
    res.status(200).json({
      status: 'Sucess',
      data,
    });
  } catch (err) {
    next(boom.notFound('Ingredient not found. ' + err.message));
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        ingredient: newIngredient,
      },
    });
  } catch (err) {
    next(boom.badRequest('Error creating the new ingredient. ' + err.message));
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidatos: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        ingredient,
      },
    });
  } catch (err) {
    next(boom.notFound('Ingredient not found. ' + err.message));
  }
};
