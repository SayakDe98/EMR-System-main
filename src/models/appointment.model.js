"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define(
    "appointment",
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // schema: process.env.SCHEMA,
      freezeTableName: true,
      timestamps: true,
      tableName: "appointment", //this is the real name of the table on the db
      underscored: true,
    }
  );

  Appointment.associate = function (models) {};

  return Appointment;
};

// module.exports = User;
