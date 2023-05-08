const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/models/index");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5001;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});
// Require routes
const patientRoutes = require("./src/routes/patient.route");
const doctorRoutes = require("./src/routes/doctor.route");
const userRoutes = require("./src/routes/user.route");
const appointmentRoutes = require("./src/routes/appointment.route");
const diagnostic_reportRoutes = require("./src/routes/diagnostic_report.route");
const encounterRoutes = require("./src/routes/encounter.route");
const patient_historyRoutes = require("./src/routes/patient_history.route");
const medication_usageRoutes = require("./src/routes/medication_usage.route");
const logger = require("./libs/logger/logger");
// using as middleware
app.use(cors({ origin: "*" }));
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/diagnostic_report", diagnostic_reportRoutes);
app.use("/api/encounter", encounterRoutes);
app.use("/api/patient_history", patient_historyRoutes);
app.use("/api/medication_usage", medication_usageRoutes);
// listen for requests
app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
  console.log(`Server is listening on port ${port}`);
});
const sync = process.env.SYNC;
if (sync === true) {
  db.sequelize.sync();
}
