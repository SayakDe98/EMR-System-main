'use strict';
const { invalidRequestBody } = require('../../libs/constants/requestBody');
const logger = require('../../libs/logger/logger');
const { MedicationUsage } = require('../models');

exports.findAll = async(req, res) => {
  try {
    let query = {};
    if(req.query) {
      query = req.query
      if(req.query.date) {
        query = { ...query, date: new Date(req.query.date) }
      }
    }
    const getAllMedicationUsages = await MedicationUsage.findAll({ where: query });
    logger.info("Successfully fetched all medication usages!");
    res.send({
      message: "Successfully fetched all medication usages!",
      data: getAllMedicationUsages,
      success: true
    })
  } catch (error) {
    logger.error("Failed to fetch all medication usages");
    res.send({
      message: "Failed to fetch all medication usages",
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
        const createMedicationUsage = await MedicationUsage.create(req.body);
        
        logger.info("Medication usage added successfully!");
        res.send({
          message: "Medication usage added successfully!",
          data: createMedicationUsage,
          success: true
        })
      } catch (error) {
        logger.error("Failed to add medication usage");
        res.send({
          message: "Failed to add medication usage",
          success: false
        })  
      }
  }
};

exports.findById = async(req, res) => {
  try {
    const getMedicationUsagesById = await MedicationUsage.findOne({ id: req.params.id });
    logger.info("Successfully fetched medication usage!");
    res.send({
      message: "Successfully fetched medication usage!",
      data: getMedicationUsagesById,
      success: true
    })
  } catch (error) {
    logger.error("Failed to fetch medication usage by id");
    res.send({
      message: "Failed to fetch medication usage by id",
      success: false
    })
  }
};

exports.update = async(req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ message: invalidRequestBody, success: false });
  } else {
    try {
      const updateMedicationUsage = await MedicationUsage.update(req.body, { where: { id: req.params.id }});
      if(updateMedicationUsage === 0) {
        throw new Error("Failed to updated medication usage");
      }
      logger.info("Medication usage updated successfully!");
      res.send({
        message: "Medication usage updated successfully!",
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
    const deleteMedicationUsage = await MedicationUsage.destroy({ where : { id: req.params.id }});
    if(deleteMedicationUsage[0] === 0) {
      throw new Error("Failed to delete medication usage");
    }
    logger.info("Medication usage deleted successfully!");
    res.send({
      message: "Medication usage deleted successfully!",
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