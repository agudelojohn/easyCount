const Ingredient = require('./../models/ingredientModel');

exports.getAllIngredients = async (req, res) => {
  try {
    let query = Ingredient.find();
    query = query.select('-__v ');
    const data = await query;
    res.status(200).json({
      status: 'Sucess',
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error geting data',
    });
  }
};

exports.getIngredient = async (req, res) => {
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
    res.status(404).json({
      status: 'Fail',
      message: 'Error geting data',
    });
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        ingredient: newIngredient,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error creating the new ingredient. ' + err,
    });
  }
};

exports.updateIngredient = async (req, res) => {
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
    res.status(400).json({
      status: 'Fail',
      message: 'Error updating the new ingredient. ' + err,
    });
  }
};
