const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

//Front Routes
router.get('/', viewsController.getRecipes);
// router.get('/recipes', viewsController.getRecipes);
router.get('/ingredients', viewsController.getIngredients);

module.exports = router;
