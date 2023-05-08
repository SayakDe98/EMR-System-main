"use strict";
const { Appointment, Doctor, Patient } = require("../models");
const logger = require("../../libs/logger/logger");
const {
  default: requestBody,
  invalidRequestBody,
} = require("../../libs/constants/requestBody");

exports.findAll = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
      if (req.query.date) {
        query = { ...query, date: new Date(req.query.date) };
      }
    }
    const getAllAppointments = await Appointment.findAll({
      where: query,
      include: [
        {
          model: Doctor,
        },
        {
          model: Patient,
        },
      ],
      attributes: {
        exclude: ["appointment_id", "patient.patient_id"],
      },
    });
    logger.info("Found all appointments successfully!");
    res.send({
      message: "Found all appointments successfully!",
      data: getAllAppointments,
      success: true,
    });
  } catch (error) {
    console.log(error);
    logger.error("Unable to find all appointments!");
    res.send({
      message: "Unable to find all appointments!",
      success: false,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
      if (req.query.date) {
        query = { ...query, date: new Date(req.query.date) };
      }
    }
    console.log(query, req.query);
    const getLatestAppointments = await Appointment.findOne(
      {
        where: query,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["appointment_id"],
        },
      }
      //   {
      //     include: [
      //       {
      //         model: Doctor,
      //       },
      //       {
      //         model: Patient,
      //       },
      //     ],
      //   }
    );
    console.log(getLatestAppointments);
    if (!getLatestAppointments.dataValues) {
      throw new Error("No latest appointments found!");
    }
    logger.info("Found latest appointments successfully!");
    res.send({
      message: "Found latest appointments successfully!",
      data: getLatestAppointments,
      success: true,
    });
  } catch (error) {
    logger.error("Unable to find latest appointments!");
    res.send({
      message: "Unable to find latest appointments!",
      success: false,
    });
  }
};

exports.create = async (req, res) => {
  if (Object.keys(req.body).length === 0 || req.body.constructor !== Object) {
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(
      `${requestBody.invalidRequestBody} for creating appointments!`
    );
  } else {
    try {
      const createAppointment = await Appointment.create(req.body);
      logger.info("Appointment added successfully!");
      res.send({
        message: "Appointment added successfully!",
        data: createAppointment,
        success: true,
      });
    } catch (error) {
      logger.error("Failed to add appointment!");
      res.send({
        message: "Failed to add appointment!",
        success: false,
      });
    }
  }
};

exports.findById = async (req, res) => {
  try {
    const getAppointmentById = await Appointment.findOne(
      {
        where: { id: req.params.id },
        attributes: {
          exclude: ["appointment_id"],
        },
      }
      //   {
      //     include: [
      //       {
      //         model: Doctor,
      //       },
      //       {
      //         model: Patient,
      //       },
      //     ],
      //   }
    );
    logger.info("Fetched appointment by id successful!");
    res.send({
      message: "Fetched appointment by id successful!",
      data: getAppointmentById,
      success: true,
    });
  } catch (error) {
    logger.error("Unable to fetch appointment by id!");
    res.send({
      message: "Unable to fetch appointment by id!",
      success: false,
    });
  }
};

exports.update = async (req, res) => {
  // validate the request first
  if (Object.keys(req.body).length === 0 || req.body.constructor !== Object) {
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${requestBody.invalidRequestBody} for updating appointment!`);
  } else {
    try {
      const updateAppointment = await Appointment.update(req.body, {
        where: { id: req.params.id },
      });
      if (updateAppointment === 0) {
        throw new Error("Failed to updated appointment!");
      }
      logger.info("Appointment successfully updated!");
      res.send({
        message: "Appointment successfully updated!",
        success: true,
      });
    } catch (error) {
      logger.error("Failed to update appointment!");
      res.send({
        message: "Failed to update appointment!",
        success: false,
      });
    }
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteAppointment = await Appointment.destroy({
      where: { id: req.params.id },
    });
    if (deleteAppointment[0] === 0) {
      throw new Error("Failed to delete appointment!");
    }
    logger.info("Appointment deleted successfully!");
    res.send({
      message: "Appointment deleted successfully!",
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
