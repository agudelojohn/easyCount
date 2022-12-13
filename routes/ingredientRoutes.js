const express = require('express');
const ingredientController = require('./../controllers/ingredientController');
const { checkApiKey } = require('./../middlewares/authHandler');

const router = express.Router();

router
  .route('/')
  .get(ingredientController.getAllIngredients)
  .post(checkApiKey, ingredientController.createIngredient);
router
  .route('/:id')
  .get(ingredientController.getIngredient)
  .patch(ingredientController.updateIngredient);

module.exports = router;
