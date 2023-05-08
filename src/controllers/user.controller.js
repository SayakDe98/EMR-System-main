'use strict';
const requestBody = require('../../libs/constants/requestBody');
const logger = require('../../libs/logger/logger');
const { User, Patient, Doctor } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.findAll = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
    }
    const getAllUsers = await User.findAll({ where: query });
    logger.info("Successfully fetched all users!");
    res.send({
      message: "Successfully fetched all users!",
      data: getAllUsers,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
};

exports.create = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ message: requestBody.invalidRequestBody, success: false });
    logger.error(`${requestBody.invalidRequestBody} for creating new user!`);
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      let createUser = await User.create(req.body);
      if (createUser.permissions === "PATIENT") {
        const payload = { ...req.body, user_id: createUser.id };
        createUser = await Patient.create(payload);
      }
      if (createUser.permissions === "DOCTOR") {
        const payload = { ...req.body, user_id: createUser.id };
        createUser = await Doctor.create(payload);
      }
      logger.info("User added successfully!");
      console.log("create user", createUser);
      res.send({
        message: "User added successfully!",
        data: createUser,
        success: true,
      });
    } catch (error) {
      logger.error(error.message);
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Please provide username and password!");
    } else if (!req.body.username) {
      throw new Error("Please provide username!");
    } else if (!req.body.password) {
      throw new Error("Please provide password!");
    }
    const getUserByUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!getUserByUsername) {
      throw new Error("User not found!");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      getUserByUsername.password
    );

    if (!validPassword) {
      return res.send({
        message: "Invalid password.",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        id: getUserByUsername.dataValues.id,
        username: getUserByUsername.dataValues.username,
        permissions: getUserByUsername.dataValues.permissions,
      },
      process.env.jwtSecret,
      { expiresIn: process.env.jwtExpirationTime }
    );
    const refreshToken = jwt.sign(
      {
        id: getUserByUsername.dataValues.id,
        permissions: getUserByUsername.dataValues.permissions,
      },
      process.env.jwtRefreshSecret,
      { expiresIn: process.env.jwtRefreshExpirationTime }
    );
    res.send({
      message: "User logged in successfully!",
      data: {
        token,
        refreshToken,
        id: getUserByUsername.dataValues.id,
      },
      success: true,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const getUserById = await User.findOne({ where: { id: req.params.id } });
    logger.info("User fetched successfully!");
    res.send({
      message: "User fetched successfully!",
      data: getUserById,
      success: true,
    });
  } catch (error) {
    logger.error(`Unable to find user by id: ${error.message}`);
    res.send({
      message: error.message,
      success: false,
    });
  }
};

exports.update = async(req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ message: requestBody.invalidRequestBody, success: false });
  } else {
    try {
      if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
      }
      const updateUser = await User.update(req.body, { where: { id: req.params.id } });
      if(updateUser[0] === 0) {
        throw new Error("Unable to update user!");
      }
      logger.info("User updated successfully!");
      res.send({
        message: "User updated successfully!",
        success: true
      })
    } catch (error) {
      logger.error(error.message);
      res.send({
        message: error.message,
        success: false
      })
    }
  }
};

exports.delete = async(req, res) => {
try {
  const deletedUser = await User.destroy({ where: { id: req.params.id } });
  if(deletedUser === 0) {
    throw new Error("Failed to delete user!")
  }
  logger.info("Deleted user successfully!");
  res.send({
    message: "Deleted user successfully!",
    success:true
  })  
} catch (error) {
    logger.error("Failed to delete user!");
    res.send({
      message: error.message,
      success: false
    })
}
};