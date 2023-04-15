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
    
    db.User = require('./user.model')(sequelize, Sequelize);
    db.Patient = require('./patient.model')(sequelize, Sequelize);
    db.Encounter = require('./encounter.model')(sequelize, Sequelize);
    db.PatientHistory = require('./patient_history.model')(sequelize, Sequelize);
    db.MedicationUsage = require('./medication_usage.model')(sequelize, Sequelize);
    db.DiagnosticReport = require('./diagnostic_report.model')(sequelize, Sequelize);
// relationships for models

//= ==============================
// Define all relationships here below
//= =============================
// db.Encounter.hasOne(db.User, {
//   foreignKey: "encounter_id",
//   as: "user",
//   sourceKey: "id"
// });
// db.User.belongsTo(db.Encounter, { as: "encounter" });

// db.Encounter.hasOne(db.Patient, { as: 'patient'});
// db.Patient.belongsTo(db.Encounter, {
//   foreignKey: "patientId",
//   as: "patient",
//   sourceKey: "id"
// });

// db.PatientHistory.hasOne(db.User);
// db.User.belongsTo(db.PatientHistory);

// db.PatientHistory.hasOne(db.Patient);
// db.Patient.belongsTo(db.PatientHistory);

// db.PatientHistory.hasMany(db.MedicationUsage);
// db.MedicationUsage.belongsTo(db.PatientHistory);

// db.Patient.hasMany(db.DiagnosticReport);
// db.DiagnosticReport.belongsTo(db.Patient);

module.exports = db;
