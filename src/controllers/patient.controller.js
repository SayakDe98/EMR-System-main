'use strict';
const { invalidRequestBody } = require('../../libs/constants/requestBody');
const logger = require('../../libs/logger/logger');
const { Patient, PatientHistory, Encounter } = require("../models");

exports.findAll = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
    }
    const getAllPatients = await Patient.findAll({
      where: query,
      attributes: {
        exclude: ["patient_id"],
      },
      include: [
        {
          model: PatientHistory,
        },
        {
          model: Encounter,
        },
      ],
    });
    logger.info("Fetched all patients successfully!");
    res.send({
      message: "Fetched all patients successfully!",
      data: getAllPatients,
      success: true,
    });
  } catch (error) {
    console.log(error);
    logger.error(`Failed to fetch all patients ${error.message}`);
    res.send({
      message: "Failed to fetch all patients",
      success: false,
    });
  }
};

exports.create = async (req, res) => {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ data: null, message: invalidRequestBody, success: false });
    logger.error(`${invalidRequestBody} for creating new patient`);
  } else {
    try {
      const createPatient = await Patient.create(req.body);
      logger.info("Patient added successfully!");
      res.send({
        message: "Patient added successfully!",
        data: createPatient,
        success: true,
      });
    } catch (error) {
      logger.error(`Failed to create new patient: ${error.message}`);
      res.send({
        message: error.message,
        success: false,
      });
    }
  }
};

exports.findById = async (req, res) => {
  try {
    const getPatientById = await Patient.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: PatientHistory,
        },
        {
          model: Encounter,
        },
      ],
    });

    logger.info("Patient fetched successfuly!");
    res.send({
      message: "Patient fetched successfuly!",
      data: getPatientById,
      success: true,
    });
  } catch (error) {
    logger.error("Unable to fetch patient by id!");
    res.send({
      message: "Unable to fetch patient by id!",
      success: false,
    });
  }
};

exports.update = async(req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${invalidRequestBody} for updating patient`);
  } else {
    try {
      const updatePatient = await Patient.update(req.body, { where: { id: req.params.id }});
      logger.info("Patient updated successfully!");
      if(updatePatient[0] === 0) {
        throw new Error("Updating patient failed!");
      }
      res.send({
        message: "Patient updated successfully!",
        success: true
      })
    } catch (error) {
      res.send({
        message: error.message,
        success: false
      })
    }
  }
};

exports.delete = async(req, res) => {
  try {
    const deletedPatient = await Patient.destroy({ where: { id: req.params.id } });
    if(deletedPatient === 0) {
      throw new Error("Unable to delete patient!")
    }
    logger.info("Patient deleted successfully!");
    res.send({
      message: "Patient deleted successfully!",
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