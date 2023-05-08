const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller');
const { checkIfUserIsAdmin } = require('../middleware/authorization.middleware');

// Retrieve all users
router.get('/' , userController.findAll);
// Create a new user
router.post('/', userController.create);
// Retrieve a single user with id
router.get('/:id', userController.findById);
// Update a user with id
router.patch('/:id', checkIfUserIsAdmin, userController.update);
// Delete a user with id
router.delete('/:id', checkIfUserIsAdmin, userController.delete);
//Login user
router.post('/login', userController.login);
module.exports = router