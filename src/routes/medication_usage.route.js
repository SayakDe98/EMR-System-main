const express = require('express')
const router = express.Router()
const Medication_usageController = require('../controllers/medication_usage.controller');
// Retrieve all Medication_usages
router.get('/', Medication_usageController.findAll);
// Create a new Medication_usage
router.post('/', Medication_usageController.create);
// Retrieve a single Medication_usage with id
router.get('/:id', Medication_usageController.findById);
// Update a Medication_usage with id
router.patch('/:id', Medication_usageController.update);
// Delete a Medication_usage with id
router.delete('/:id', Medication_usageController.delete);
module.exports = router