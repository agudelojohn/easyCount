const Recipe = require('./../models/recipeModel');

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

exports.getIngredients = (req, res) => {
  res.status(200).render('ingredients', {
    title: 'Ingredients',
  });
};
