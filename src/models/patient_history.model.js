'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const PatientHistory = sequelize.define("patient_history", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        immunisations: {
            type: Sequelize.STRING
        },
        medical_issues: {
            type: Sequelize.STRING
        },
        surgical_operations: {
            type: Sequelize.STRING
        },
        allergies: {
            type: Sequelize.STRING
        },
        exercise_frequency: {
            type: Sequelize.STRING
        },
        drinks_alcohol: {
            type: DataTypes.BOOLEAN
        },
        tobacco_used_past: {
            type: DataTypes.BOOLEAN
        },
        uses_recreational_drugs: {
            type: DataTypes.BOOLEAN
        },
        mental_health_history: {
            type: DataTypes.STRING
        },
        family_history: {
            type: DataTypes.STRING
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        date: {
            type: DataTypes.DATE
        }
        
    },
    {
        freezeTableName: true,
        timestamps: true,
        tableName: "patient_history", //this is the real name of the table on the db
        underscored: true,
    });

    PatientHistory.associate = function (models) { };

    return PatientHistory;
}