'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const MedicationUsage = sequelize.define("medication_usage", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        medication_name: {
            type: Sequelize.STRING
        },
        medication_dose: {
            type: Sequelize.STRING
        },
        medication__frequency: {
            type: Sequelize.STRING
        },
        patient_history_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient_history',
                key: 'id'
            }
        }
    },
    {
        // schema: process.env.SCHEMA,
        freezeTableName: true,
        timestamps: true,
        tableName: "medication_usage", //this is the real name of the table on the db
        underscored: true,
    });

    MedicationUsage.associate = function (models) { };

    return MedicationUsage;
}