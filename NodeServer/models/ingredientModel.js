const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The ingredient needs a name'],
    // TODO: remove comment down
    // unique: true,
  },
  calories: {
    type: Number,
    required: [true, 'The ingredient must have the number of calories'],
    min: [0, 'Calories value must be positive'],
  },
  measure: {
    type: String,
    required: [true, 'Ingredient must have a valid measure'],
    maxLength: [5, "Measures can't be too long"],
  },
  soldIndividualy: Boolean,
});

const Ingredient = mongoose.Schema('Ingredient', ingredientSchema);
module.exports = Ingredient;
