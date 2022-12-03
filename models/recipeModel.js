const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The recipe needs a name'],
      unique: true,
    },
    description: String,
    steps: {
      type: String,
      required: [true, 'Recipe needs details of how to prepare'],
    },
    link: String,
    ingredients: [
      {
        data: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        amount: String,
      },
    ],
    image: {
      type: String,
      default: 'default.jpg',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//VIRTUAL PROPERTIES
recipeSchema.virtual('totalCalories').get(function () {
  // Here the keyword THIS is pointhing to the current document
  let total = 0;
  this.ingredients.forEach((ingredient) => {
    total += ingredient.data.calories * 1 * ingredient.amount;
  });
  return total;
});

//QUERY MIDDLEWARE
recipeSchema.pre(/^find/, function (next) {
  // In this case of queries the keyword THIS is pointing to the query itself
  this.populate({
    path: 'ingredients.data',
    select: '-__v',
  });
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
