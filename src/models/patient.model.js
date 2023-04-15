'use strict';
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        prefix: {
            type: DataTypes.ENUM,
            values: ["Mr", "Mrs", "Ms"],
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["Male", "Female", "Other"]
        },
        dob: {
            type: DataTypes.DATE
        },
        city: {
            type: Sequelize.STRING
        },
        zipcode: {
            type: DataTypes.INTEGER
        },
        state: {
            type: Sequelize.STRING
        },
        cellphone: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        tableName: "patient", //this is the real name of the table on the db
        underscored: true,
    });

    Patient.associate = function (models) { };

    return Patient;
}