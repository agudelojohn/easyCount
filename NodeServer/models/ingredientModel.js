const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The ingredient needs a name'],
    unique: true,
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
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
});
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
