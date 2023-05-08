const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctor.controller');
const { checkIfUserIsAdmin } = require('../middleware/authorization.middleware');

// Retrieve all doctors
router.get('/', doctorController.findAll);
// Create a new doctor
router.post('/', doctorController.create);
// Retrieve a single doctor with id
router.get('/:id', doctorController.findById);
// Update a doctor with id
router.patch('/:id', doctorController.update);
// Delete a doctor with id
router.delete('/:id', checkIfUserIsAdmin, doctorController.delete);
module.exports = router