'use strict';
const { DataTypes, STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctor", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM,
            values: ["Male", "Female", "Other"],
            allowNull: true
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cellphone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        highest_qualification: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        tableName: "doctor", //this is the real name of the table on the db
        underscored: true,
    });

    Doctor.associate = function (models) { };

    return Doctor;
}