"use strict";
const { Op } = require("sequelize");
const { invalidRequestBody } = require("../../libs/constants/requestBody");
const logger = require("../../libs/logger/logger");
const { Doctor } = require("../models");

exports.findAll = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
      if (req.query.search) {
        query = {
          [Op.or]: {
            first_name: {
              [Op.like]: `%${req.query.search}%`,
            },
            last_name: {
              [Op.like]: `%${req.query.search}%`,
            },
          },
        };
      }
    }
    const getAllDoctors = await Doctor.findAll({ where: query });
    logger.info("Successfully fetched all doctors");
    res.send({
      message: "Successfully fetched all doctors",
      data: getAllDoctors,
      success: true,
    });
  } catch (error) {
    logger.error(`Failed to fetch all doctors ${error.message}`);
    res.send({
      message: "Failed to fetch all doctors",
      success: false,
    });
  }
};

exports.create = async (req, res) => {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${invalidRequestBody} for creating doctor`);
  } else {
    try {
      const createDoctor = await Doctor.create(req.body);
      logger.info("Doctor added successfully!");
      res.send({
        message: "Doctor added successfully!",
        data: createDoctor,
        success: true,
      });
    } catch (error) {
      logger.error(`Failed to create new doctor ${error.message}`);
      res.send({
        message: "Failed to create new doctor!",
        success: false,
      });
    }
  }
};

exports.findById = async (req, res) => {
  try {
    const getDoctorById = await Doctor.findOne({
      where: { id: req.params.id },
    });
    logger.info("Successfully fetched doctor by id!");
    res.send({
      message: "Successfully fetched doctor by id!",
      data: getDoctorById,
      success: true,
    });
  } catch (error) {
    logger.error("Failed to fetch doctor by id");
    res.send({
      message: "Failed to fetch doctor by id",
      success: false,
    });
  }
};

exports.update = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: invalidRequestBody });
    logger.error(`${invalidRequestBody} for updating doctor`);
  } else {
    try {
      const updateDoctor = await Doctor.update(req.body, {
        where: { id: req.params.id },
      });
      if (updateDoctor === 0) {
        throw new Error("Failed to updated doctor");
      }
      logger.info("Doctor successfully updated");
      res.send({
        message: "Doctor successfully updated",
        success: true,
      });
    } catch (error) {
      logger.error("Failed to updated doctor");
      res.send({
        message: "Failed to updated doctor",
        success: false,
      });
    }
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteDoctor = await Doctor.destroy({ where: { id: req.params.id } });
    if (deleteDoctor[0] === 0) {
      throw new Error("Failed to delete doctor");
    }
    logger.info("Doctor deleted successfully!");
    res.send({
      message: "Doctor deleted successfully!",
      success: true,
    });
  } catch (error) {
    logger.error(error.message);
    res.send({
      message: error.message,
      success: false,
    });
  }
};
