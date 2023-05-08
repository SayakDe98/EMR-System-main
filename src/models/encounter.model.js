'use strict';

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Encounter = sequelize.define("encounter", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        note: {
            type: Sequelize.STRING
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
        tableName: "encounter", //this is the real name of the table on the db
        underscored: true,
    });
    Encounter.associate = function (models) { };
    return Encounter;
}
