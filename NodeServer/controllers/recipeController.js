const multer = require('multer');

const Recipe = require('./../models/recipeModel');
const APIFeatures = require('./../utils/apiFeatures');

//This object uses the multer package that allows to upload files to the application
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/recipes');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const objName = req.body.name || req.RecipeName;
    cb(null, `${objName.replace(/\s/g, '')}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // throw new Error('Please upload only images');
    cb(new Error('Please upload only images'));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadRecipeImage = upload.single('image');

exports.getRecipeName = async (req, res, next) => {
  try {
    const data = await Recipe.findById(req.params.id).select('name');
    req.RecipeName = data.name;
    next();
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error getting the data. ' + err.message,
    });
  }
};

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
    if (req.file) req.body.image = req.file.filename;
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
    if (req.file) req.body.image = req.file.filename;
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
