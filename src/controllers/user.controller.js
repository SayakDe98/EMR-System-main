'use strict';
const requestBody = require('../../libs/constants/requestBody');
const logger = require('../../libs/logger/logger');
const { User } = require('../models')
const bcrypt = require('bcrypt');

exports.findAll = async(req, res) => {
    try {
      const getAllUsers = await User.findAll({});
      logger.info("Successfully fetched all users!");
      res.send({
        message: "Successfully fetched all users!",
        data: getAllUsers,
        success: true
      })
    } catch (error) {
      res.send({
        message: error.message,
        success: false
      })
    }
};

exports.create = async function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: requestBody.invalidRequestBody, success: false });
    logger.error(`${requestBody.invalidRequestBody} for creating new user!`);
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)
      const createUser = await User.create(req.body);
      logger.info("User added successfully!")
      res.send({
        message: "User added successfully!",
        data: createUser,
        success: true
      })

    } catch (error) {
      logger.error(error.message)
      res.send({
        message: error.message,
        success: false
      })
    }

  }
};

exports.findById = async (req, res) => {
  try {
    const getUserById = await User.findOne({ id: req.params.id });
    logger.info("User fetched successfully!");
    res.send({
      message: "User fetched successfully!",
      data: getUserById,
      success: true
    })
  } catch (error) {
    logger.error(`Unable to find user by id: ${error.message}`);
    res.send({
      message: error.message,
      success: false
    })
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