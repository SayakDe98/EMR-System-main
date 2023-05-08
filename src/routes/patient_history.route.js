const express = require('express')
const router = express.Router()
const patient_historyController = require('../controllers/patient_history.controller');
const {
  checkIfUserIsAdmin,
} = require("../middleware/authorization.middleware");
// Retrieve all patient_historys
router.get('/', patient_historyController.findAll);
// Create a new patient_history
router.post('/', patient_historyController.create);
router.get("/latest", patient_historyController.findOne);
// Retrieve a single patient_history with id
router.get('/:id', patient_historyController.findById);
// Update a patient_history with id
router.patch("/:id", patient_historyController.update);
// Delete a patient_history with id
router.delete("/:id", checkIfUserIsAdmin, patient_historyController.delete);
module.exports = router