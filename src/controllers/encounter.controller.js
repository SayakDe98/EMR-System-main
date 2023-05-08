'use strict';
const { invalidRequestBody } = require('../../libs/constants/requestBody');
const logger = require('../../libs/logger/logger');
const { Encounter } = require('../models');

exports.findAll = async (req, res) => {
  try {
    let query = {};
    if (req.query) {
      query = req.query;
      if (req.query.date) {
        query = { ...query, date: new Date(req.query.date) };
      }
    }
    const getAllEncounters = await Encounter.findAll({ where: query });
    logger.info("Successfully fetched all encounters");
    res.send({
      message: "Successfully fetched all encounters",
      data: getAllEncounters,
      success: true,
    });
  } catch (error) {
    logger.error(`Failed to fetch all encounters ${error.message}`);
    res.send({
      message: "Failed to fetch all encounters",
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
    console.log(req.query, query);
    const getLatestEncounter = await Encounter.findOne({
      where: query,
      order: [["createdAt", "DESC"]],
    });
    if (!getLatestEncounter.dataValues) {
      throw new Error("No records found!");
    }
    logger.info("Found latest encounter successfully!");
    res.send({
      message: "Found latest encounter successfully!",
      data: getLatestEncounter,
      success: true,
    });
  } catch (error) {
    logger.error("Unable to find latest encounter!");
    res.send({
      message: "Unable to find latest encounter!",
      success: false,
    });
  }
};

exports.create = async (req, res) => {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ message: invalidRequestBody, success: false });
    logger.error(`${invalidRequestBody} for creating encounter`);
  } else {
    try {
      const createEncounter = await Encounter.create(req.body);
      logger.info("Encounter added successfully!");
      res.send({
        message: "Encounter added successfully!",
        data: createEncounter,
        success: true,
      });
    } catch (error) {
      logger.error(`Failed to create new encounter ${error.message}`);
      res.send({
        message: "Failed to create new encounter!",
        success: false,
      });
    }
  }
};

exports.findById = async (req, res) => {
  try {
    const getEncounterById = await Encounter.findOne({ id: req.params.id });
    logger.info("Successfully fetched encounter by id!");
    res.send({
      message: "Successfully fetched encounter by id!",
      data: getEncounterById,
      success: true,
    });
  } catch (error) {
    logger.error("Failed to fetch encounter by id");
    res.send({
      message: "Failed to fetch encounter by id",
      success: false,
    });
  }
};

exports.update = async(req, res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error: true, message: invalidRequestBody });
    logger.error(`${invalidRequestBody} for updating encounter`);
  } else {
    try {
      const updateEncounter = await Encounter.update(req.body, { where: { id: req.params.id }});
      if(updateEncounter === 0) {
        throw new Error("Failed to updated encounter");
      }
      logger.info("Encounter successfully updated");
      res.send({
        message: "Encounter successfully updated",
        success: true
      })
    } catch (error) {
      logger.error("Failed to updated encounter");
      res.send({
        message: 'Failed to updated encounter',
        success: false
      })  
    }
  }
};

exports.delete = async(req, res) => {
  try {
    const deleteEncounter = await Encounter.destroy({ where : { id: req.params.id }});
    if(deleteEncounter[0] === 0) {
      throw new Error("Failed to delete encounter");
    }
    logger.info('Encounter deleted successfully!');
    res.send({
      message: "Encounter deleted successfully!",
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