const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });
const fs = require('fs');
const mongoose = require('mongoose');
const Ingredient = require('./../models/ingredientModel');
const Recipe = require('./../models/recipeModel');

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);
//Start server
const port = process.env.PORT || 3000;
mongoose.connect(DB).then(() => {
  console.log('DB Connection successful!...');
});

//RED JSON FILE
const ingredients = JSON.parse(
  fs.readFileSync(`${__dirname}/ingredients.json`, 'utf-8')
);
const recipes = JSON.parse(
  fs.readFileSync(`${__dirname}/recipes.json`, 'utf-8')
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Ingredient.create(ingredients);
    console.log('Data successfully loaded!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const importRecipesData = async () => {
  try {
    await Recipe.create(recipes);
    console.log('Data successfully loaded!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DDATA FROM DB
const deleteData = async () => {
  try {
    await Recipe.deleteMany();
    await Ingredient.deleteMany();
    console.log('Data successfully deleted!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  if (process.argv[3] && process.argv[3] === '--recipes') {
    importRecipesData();
  } else {
    importData();
  }
} else if (process.argv[2] === '--delete') {
  deleteData();
}
