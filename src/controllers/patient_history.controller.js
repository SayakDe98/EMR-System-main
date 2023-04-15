'use strict';
const logger = require('../../libs/logger/logger');
const { PatientHistory } = require('../models');
const { invalidRequestBody } = require('../../libs/constants/requestBody');

exports.findAll = async(req, res) => {
    try {
      const getAllPatientHistories = await PatientHistory.findAll({});
      logger.info("Fetched all patient histories successfully!");
      res.send({
        message: "Fetched all patient histories successfully!",
        data: getAllPatientHistories,
        success: false
      })
    } catch (error) {
      console.log(error.message)
      logger.error(`Failed to fetch all patient histories: ${error.message}`);
      res.send({
        message: "Failed to fetch all patient histories",
        success: false
      })
    }
};

exports.create = async(req, res) => {
//handles null error
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ message: invalidRequestBody, success: false });
  } else {
  try {
    const createPatientHistory = await PatientHistory.create(req.body);
    logger.info("Patient history created successfully!");
    
    res.send({
      message: "Patient history created successfully!",
      data: createPatientHistory,
      success: true
    })
  } catch (error) {
    logger.error("Failed to create patient history!");
    res.send({
      message: "Failed to create patient history!",
      success: false
    })  
  }
  }
};

exports.findById = async(req, res) => {
  try {
    const getPatientHistoryById = await PatientHistory.findOne({ id: req.params.id });
    logger.info("Fetched patient history successfully!");
    res.send({
      message: "Fetched patient history successfully!",
      data: getPatientHistoryById,
      success: true
    })
  } catch (error) {
      logger.error("Failed to fetch patient history by id!");
      res.send({
        message: "Failed to fetch patient history by id!",
        success: false
      })
  }
};

exports.findByPatientId = async(req, res) => {
  try {
    const getPatientHistoryByPatientId = await PatientHistory.findAll({ where: { patient_id: req.params.id }});
    logger.info("Successfully fetched patient history!");
    res.send({
      message: "Successfully fetched patient history!",
      data: getPatientHistoryByPatientId,
      success: true
    })
  } catch (error) {
    logger.error("Failed to fetch patient history by patient id!");
    res.send({
      message: "Failed to fetch patient history by patient id!",
      success: false
    })
  }
};

exports.findByUserId = async(req, res) => {
  try {
    const getPatientHistoryByPatientId = await PatientHistory.findAll({ where: { user_id: req.params.id }});
    logger.info("Successfully fetched patient history!");
    res.send({
      message: "Successfully fetched patient history!",
      data: getPatientHistoryByPatientId,
      success: true
    })
  } catch (error) {
    logger.error("Failed to fetch patient history by user id!");
    res.send({
      message: "Failed to fetch patient history by user id!",
      success: false
    })
  }
};
  
exports.update = async(req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${invalidRequestBody} for updating patient history!`);
  } else {
    try {
      const updatePatientHistory = await PatientHistory.update(req.body, { where: { id: req.params.id }});
      if(updatePatientHistory === 0) {
        throw new Error("Failed to updated patient history!");
      }
      logger.info("Patient history updated successfully!");
      res.send({
        message: "Patient history updated successfully!",
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
    const deletePatientHistory = await PatientHistory.destroy({ where : { id: req.params.id }});
    if(deletePatientHistory[0] === 0) {
      throw new Error("Failed to delete patient history!");
    }
    logger.info("Patient history deleted successfully!");
    res.send({
      message: "Patient history deleted successfully!",
      success: true
    })
  } catch (error) {
    logger.error(error.message);
    res.send({
      message: error.message,
      success: false
    })
  }
};