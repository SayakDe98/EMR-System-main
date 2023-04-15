'use strict';
const { DiagnosticReport } = require('../models');
const logger = require('../../libs/logger/logger');
const { default: requestBody, invalidRequestBody } = require('../../libs/constants/requestBody');

exports.findAll = async(req, res) => {
    try {
      const getAllDiagnosticReports = await DiagnosticReport.findAll({});
      logger.info("Found all diagnostic reports successfully!");
      res.send({
        message: "Found all diagnostic reports successfully!",
        data: getAllDiagnosticReports,
        success: true
      })
    } catch (error) {
      logger.error("Unable to find all diagnostic reports!");
      res.send({
        message: "Unable to find all diagnostic reports!",
        success: false
      })
    }
};

exports.create = async(req, res) => {
  if (Object.keys(req.body).length === 0 || req.body.constructor !== Object) {
      res.status(400).send({ message: invalidRequestBody, success: false });
      logger.error(`${requestBody.invalidRequestBody} for creating diagnostic report!`);
  } else {
        try {
          const createDiagnosticReport = await DiagnosticReport.create(req.body);
          logger.info("Diagnostic report added successfully!");
          res.send({
            message: "Diagnostic report added successfully!",
            data: createDiagnosticReport,
            success: true
          })
        } catch (error) {
          logger.error("Failed to add diagnostic report!");
          res.send({
            message: "Failed to add diagnostic report!",
            success: false
          })
        }
  }
};

exports.findById = async(req, res) => {
  try {
    const getDiagnosticReportById = await DiagnosticReport.findOne({ id: req.params.id });
    logger.info("Fetched diagnostic report by id successful!");
    res.send({
      message: "Fetched diagnostic report by id successful!",
      data: getDiagnosticReportById,
      success: true
    })
  } catch (error) {
    logger.error("Unable to fetch diagnostic report by id!");
    res.send({
      message: "Unable to fetch diagnostic report by id!",
      success: false
    })
  }
};

exports.findByPatientId = async(req, res) => {
  try {
    const getDiagnosticReportByPatientId = await DiagnosticReport.findAll({ where: { patient_id: req.params.id } });
    logger.info("Fetched diagnostic report by patient id successful!");
    res.send({
      message: "Fetched diagnostic report by patient id successful!",
      data: getDiagnosticReportByPatientId,
      success: true
    })
  } catch (error) {
    logger.error("Unable to fetch diagnostic report by patient id!");
    res.send({
      message: "Unable to fetch diagnostic report by patient id!",
      success: false
    })
  }
};

exports.update = async(req, res) => {
  // validate the request first
  if (Object.keys(req.body).length === 0 || req.body.constructor !== Object) {
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${requestBody.invalidRequestBody} for updating diagnostic report!`);
} else {
    try {
      const updateDiagnosticReport = await DiagnosticReport.update(req.body, { where: { id: req.params.id }});
      if(updateDiagnosticReport === 0) {
        throw new Error("Failed to updated diagnostic report!");
      }
      logger.info("Diagnostic successfully updated!");
      res.send({
        message: "Diagnostic successfully updated!",
        success: true
      })
    } catch (error) {
      logger.error("Failed to update diagnostic report!");
      res.send({
        message: "Failed to update diagnostic report!",
        success: false
      })  
    }
  }
};


exports.delete = async(req, res) => {
  try {
    const deleteDiagnosticReport = await DiagnosticReport.destroy({ where : { id: req.params.id }});
    if(deleteDiagnosticReport[0] === 0) {
      throw new Error("Failed to delete diagnostic report!");
    }
    logger.info("Diagnostic report deleted successfully!");
    res.send({
      message: "Diagnostic report deleted successfully!",
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