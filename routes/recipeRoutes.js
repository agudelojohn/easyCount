const express = require('express');
const recipeController = require('./../controllers/recipeController');

const router = express.Router();

router
  .route('/')
  .get(recipeController.getAllRecipes)
  .post(recipeController.uploadRecipeImage, recipeController.createRecipe);
router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(
    recipeController.getRecipeName,
    recipeController.uploadRecipeImage,
    recipeController.updateRecipe
  );

module.exports = router;
