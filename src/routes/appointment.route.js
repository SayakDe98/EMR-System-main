const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const {
  checkIfUserIsAdmin,
} = require("../middleware/authorization.middleware");
// Retrieve all diagnostic_reports
router.get("/", appointmentController.findAll);
//Retrieve latest diagnostic_reports
router.get("/latest", appointmentController.findOne);
// Create a new diagnostic_report
router.post("/", appointmentController.create);
// Retrieve a single diagnostic_report with id
router.get("/:id", appointmentController.findById);
// Update a diagnostic_report with id
router.patch("/:id", appointmentController.update);
// Delete a diagnostic_report with id
router.delete("/:id", appointmentController.delete);
module.exports = router;
