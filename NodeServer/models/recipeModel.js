const mongoose = require('mongoose');
const Ingredient = require('./ingredientModel');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The recipe needs a name'],
    // TODO: remove comment down
    // unique: true,
  },
  description: String,
  steps: {
    type: String,
    required: [true, 'Recipe needs details of how to prepare'],
  },
  link: String,
  ingredients: [Ingredient],
});
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
