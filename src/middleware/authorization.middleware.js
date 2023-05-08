const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateUser = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw new Error("Access denied. No token provided.");
        }
        const { authorization } = req.headers;
        const decodedToken = jwt.decode(authorization, process.env.jwtSecret);
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        })
    }
}

exports.checkIfUserIsAdmin = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw new Error("Access denied. No token provided.");
        }
        const { authorization } = req.headers;
        const decodedToken = jwt.verify(authorization, process.env.jwtSecret);
        req.user = decodedToken;

        if(req.user.permissions !== 'ADMIN') {
            throw new Error("User is not authorized.");
        }

        next();
    } catch (error) {
        return res.status(403).json({
            message: error.message,
            success: false
        })
    }
}

exports.checkIfUserIsPatient = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw new Error("Access denied. No token provided.");
        }
        const { authorization } = req.headers;
        const decodedToken = jwt.verify(authorization, process.env.jwtSecret);
        req.user = decodedToken;

        if(req.user.permissions !== 'PATIENT') {
            throw new Error("User is not a patient.");
        }

        next();
    } catch (error) {
        return res.status(403).json({
            message: error.message,
            success: false
        })
    }
}

exports.checkIfUserIsDoctor = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            throw new Error("Access denied. No token provided.");
        }
        const { authorization } = req.headers;
        const decodedToken = jwt.verify(authorization, process.env.jwtSecret);
        req.user = decodedToken;

        if(req.user.permissions !== 'DOCTOR') {
            throw new Error("User is not a doctor.");
        }

        next();
    } catch (error) {
        return res.status(403).json({
            message: error.message,
            success: false
        })
    }
}