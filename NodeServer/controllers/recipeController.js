const Recipe = require('./../models/recipeModel');
const APIFeatures = require('./../utils/apiFeatures');
exports.getAllRecipes = async (req, res) => {
  try {
    const apiFeatures = new APIFeatures(Recipe.find(), req.query)
      .filterData()
      .limitFieldsData()
      .paginateData()
      .sortData();
    const data = await apiFeatures.queryToDB;

    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error getting the data. ' + err.message,
    });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const query = Recipe.findById(req.params.id).select('-__v');
    const data = await query;
    res.status(200).json({
      status: 'Success',
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error getting the data. ' + err.message,
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: newRecipe,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error creating the new ingredient. ' + err.message,
    });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidatos: true,
    });
    res.status(200).json({
      status: 'Success',
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error updating the data. ' + err.message,
    });
  }
};
