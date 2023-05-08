'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const DiagnosticReport = sequelize.define(
      "diagnostic_report",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        patient_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "patient",
            key: "id",
          },
          allowNull: false,
        },
        doctor_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "doctor",
            key: "id",
          },
          allowNull: false,
        },
        appointment_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "appointment",
            key: "id",
          },
          allowNull: false,
        },
        respiratory_rate: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        oxygen_saturation: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        supplemental_oxygen: {
          type: Sequelize.INTEGER,
        },
        body_temperature: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        systolic_bp: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        heart_rate: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        level_of_consciousness: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        // schema: process.env.SCHEMA,
        freezeTableName: true,
        timestamps: true,
        tableName: "diagnostic_report", //this is the real name of the table on the db
        underscored: true,
      }
    );

    DiagnosticReport.associate = function (models) { };

    return DiagnosticReport;
}

// module.exports = User;