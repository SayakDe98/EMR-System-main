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
            type: Sequelize.STRING,
            allowNull: false
        },
        surgical_operations: {
            type: Sequelize.STRING,
            allowNull: false
        },
        allergies: {
            type: Sequelize.STRING,
            allowNull: false
        },
        exercise_frequency: {
            type: Sequelize.STRING
        },
        drinks_alcohol: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tobacco_used_past: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        uses_recreational_drugs: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mental_health_history: {
            type: DataTypes.STRING
        },
        family_history: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id'
            },
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
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