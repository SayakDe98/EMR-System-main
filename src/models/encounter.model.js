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
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
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
