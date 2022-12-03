const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

//Front Routes
router.get('/', viewsController.getHome);
router.get('/recipes', viewsController.getRecipes);
router.get('/recipes/add', viewsController.addRecipe);
router.get('/recipes/:id', viewsController.getDetailRecipe);
router.get('/ingredients', viewsController.getIngredients);
router.get('/ingredients/add', viewsController.addIngredient);

module.exports = router;
