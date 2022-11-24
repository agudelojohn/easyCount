const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
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
      amount: Number,
    },
  ],
  // ingredients: [
  //   {
  //     type: Map,
  //     of: new mongoose.Schema(
  //       {
  //         amount: Number,
  //         data: {
  //           type: mongoose.Schema.ObjectId,
  //           ref: 'Ingredient',
  //         },
  //       },
  //       { _id: false }
  //     ),
  //   },
  // ],
  image: {
    type: String,
    default: 'default.jpg',
  },
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
