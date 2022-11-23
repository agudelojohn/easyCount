const Ingredient = require('./../models/ingredientModel');

exports.getAllIngredients = async (req, res) => {
  try {
    let queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    // Remove fields not related with the data itself
    excludedFields.forEach((el) => delete queryObj[el]);

    // First the query object is build
    //1. Add object containing user filters
    let query = Ingredient.find(queryObj);
    //2. Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    //3. Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v ');
    }
    //4. Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const num = await Ingredient.countDocuments();
      if (skip > num) throw new Error('This page does not exist');
    }
    //Here is where the query is really executed, that's why needs the AWAIT keyword
    const data = await query;
    res.status(200).json({
      status: 'Sucess',
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'Fail',
      message: 'Error geting data',
      error: err.message,
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
