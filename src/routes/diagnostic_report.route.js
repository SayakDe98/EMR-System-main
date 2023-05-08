const express = require('express')
const router = express.Router()
const diagnostic_reportController = require('../controllers/diagnostic_report.controller');
const {
  checkIfUserIsAdmin,
} = require("../middleware/authorization.middleware");
// Retrieve all diagnostic_reports
router.get("/", diagnostic_reportController.findAll);
//Retrieve latest diagnostic_reports
router.get("/latest", diagnostic_reportController.findOne);
// Create a new diagnostic_report
router.post('/', diagnostic_reportController.create);
// Retrieve a single diagnostic_report with id
router.get('/:id', diagnostic_reportController.findById);
// Update a diagnostic_report with id
router.patch("/:id", diagnostic_reportController.update);
// Delete a diagnostic_report with id
router.delete("/:id", checkIfUserIsAdmin, diagnostic_reportController.delete);
module.exports = router