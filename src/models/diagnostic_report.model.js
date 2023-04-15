'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const DiagnosticReport = sequelize.define("diagnostic_report", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        respiratory_rate: {
            type: Sequelize.INTEGER
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id'
            }
        },
        respiratory_rate: {
            type: Sequelize.INTEGER
        },
        oxygen_saturation: {
            type: Sequelize.INTEGER
        },
        supplemental_oxygen: {
            type: Sequelize.INTEGER
        },
        body_temperature: {
            type: Sequelize.INTEGER
        },
        systolic_bp: {
            type: Sequelize.INTEGER
        },
        heart_rate: {
            type: Sequelize.INTEGER
        },
        level_of_consciousness: {
            type: Sequelize.INTEGER
        },
    },
    {
        // schema: process.env.SCHEMA,
        freezeTableName: true,
        timestamps: true,
        tableName: "diagnostic_report", //this is the real name of the table on the db
        underscored: true,
    });

    DiagnosticReport.associate = function (models) { };

    return DiagnosticReport;
}

// module.exports = User;