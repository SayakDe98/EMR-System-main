'use strict';
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        permissions: {
            type: DataTypes.ENUM,
            values: ['ADMIN', 'PATIENT', 'DOCTOR']
        },
        password: {
            type: Sequelize.STRING,
        }
    },
    {
        // schema: process.env.SCHEMA,
        freezeTableName: true,
        timestamps: true,
        tableName: "user", //this is the real name of the table on the db
        underscored: true,
    });
    User.associate = function (models) { };

    return User;
}