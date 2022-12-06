const Recipe = require('./../models/recipeModel');
const Ingredient = require('./../models/ingredientModel');

exports.getRecipes = async (req, res) => {
  try {
    //1) Get recipes data from collection
    const recipes = await Recipe.find().sort('name');
    //2) Buld template
    //3) Render that template using that data
    res.status(200).render('recipes', {
      title: 'Recipes',
      recipes,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};

exports.getIngredients = async (req, res) => {
  try {
    //1) Get recipes data from collection
    const ingredients = await Ingredient.find().sort('name');
    //2) Buld template
    //3) Render that template using that data
    res.status(200).render('ingredients', {
      title: 'Ingredients',
      ingredients,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    //1) Get ingredients data
    const ingredients = await Ingredient.find().sort('name');
    res.status(200).render('newRecipe', {
      title: 'Add recipe',
      ingredients,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};

exports.addIngredient = async (req, res) => {
  try {
    res.status(200).render('newIngredient', {
      title: 'New Ingredient',
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};

exports.getHome = async (req, res) => {
  try {
    res.status(200).render('home', {
      title: 'Home',
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};

exports.getDetailRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).render('detail', {
      title: 'Recipe',
      recipe,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Error loading the view',
    });
  }
};
