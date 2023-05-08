const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
// eslint-disable-next-line import/no-dynamic-require
const config = require(`../../config/config`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
    );
  }
  
  fs.readdirSync(__dirname)
  .filter(
    (file) =>
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
    
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
      if (process.env.SYNC === "true" || process.env.SYNC === true) {
        db[modelName].sync().then(() => console.log("Sync complete"));
      }
    });
    
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.Encounter = require("./encounter.model")(sequelize, Sequelize);

    db.MedicationUsage = require("./medication_usage.model")(
      sequelize,
      Sequelize
    );
    db.DiagnosticReport = require("./diagnostic_report.model")(
      sequelize,
      Sequelize
    );
    db.Appointment = require("./appointment.model")(sequelize, Sequelize);
    db.PatientHistory = require("./patient_history.model")(
      sequelize,
      Sequelize
    );
    db.Doctor = require("./doctor.model")(sequelize, Sequelize);
    db.Patient = require("./patient.model")(sequelize, Sequelize);

    db.User = require("./user.model")(sequelize, Sequelize);

    // relationships for models

    //= ==============================
    // Define all relationships here below
    //= =============================

    db.Patient.hasMany(db.PatientHistory, {
      sourceKey: "id",
      foreignKey: "patientId",
    });
    db.PatientHistory.belongsTo(db.Patient, { foreignKey: "patient_id" });
    db.Patient.hasMany(db.Encounter, {
      sourceKey: "id",
      foreignKey: "patient_id",
    });
    db.Encounter.belongsTo(db.Patient, { foreignKey: "patient_id" });

    db.Doctor.hasMany(db.Appointment, {
      sourceKey: "id",
      foreignKey: "doctor_id",
    });
    db.Appointment.belongsTo(db.Doctor, { foreignKey: "doctor_id" });
    db.Appointment.hasOne(db.Patient, {
      sourceKey: "id",
      foreignKey: "patient_id",
    });
    db.Patient.belongsTo(db.Appointment, { foreignKey: "patient_id" });

    db.Doctor.hasMany(db.DiagnosticReport, {
      sourceKey: "id",
      foreignKey: "doctor_id",
    });
    db.DiagnosticReport.belongsTo(db.Doctor, { foreignKey: "doctor_id" });
    db.DiagnosticReport.hasOne(db.Patient, {
      sourceKey: "id",
      foreignKey: "patient_id",
    });
    db.Patient.belongsTo(db.DiagnosticReport, { foreignKey: "patient_id" });

    db.DiagnosticReport.hasOne(db.Appointment, {
      sourceKey: "id",
      foreignKey: "appointment_id",
    });
    db.Appointment.belongsTo(db.DiagnosticReport, {
      foreignKey: "appointment_id",
    });


module.exports = db;
