const express = require('express');
const userController = require('./../controllers/userController');
const { checkApiKey } = require('./../middlewares/authHandler');

const router = express.Router();

router
  .route('/')
  .get(checkApiKey, userController.getAllUsers)
  .post(checkApiKey, userController.createUser);

module.exports = router;
