const express = require('express')
const router = express.Router()
const encounterController = require('../controllers/encounter.controller');
// Retrieve all encounters
router.get('/', encounterController.findAll);
// Create a new encounter
router.post('/', encounterController.create);
//Retrieve latest encounter
router.get("/latest", encounterController.findOne);
// Retrieve a single encounter with id
router.get('/:id', encounterController.findById);
// Update a encounter with id
router.patch("/:id", encounterController.update);
// Delete a encounter with id
router.delete("/:id", encounterController.delete);
module.exports = router