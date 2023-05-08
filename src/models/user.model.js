'use strict';
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        permissions: {
          type: DataTypes.ENUM,
          values: ["ADMIN", "PATIENT", "DOCTOR"],
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM,
          values: ["Male", "Female", "Other"],
          allowNull: true,
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        zipcode: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cellphone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        highest_qualification: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        // schema: process.env.SCHEMA,
        freezeTableName: true,
        timestamps: true,
        tableName: "user", //this is the real name of the table on the db
        underscored: true,
      }
    );
    User.associate = function (models) { };

    return User;
}