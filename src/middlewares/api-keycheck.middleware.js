"use strict";
const ApiKey = require('../models/api/ApiKey.model');
const ApiLog = require('../models/api/ApiLog.model');

const checkApiMiddleware = async (req, res, next) => {
    let key = req.headers["x-api-key"];

    if (!key) return res.status(401).send({ message: "Unauthorized!" });

    try {
        const apiKey = await ApiKey.findOne({key: key});
        if (apiKey.length < 1) return res.status(401).send({ message: "Unauthorized!" });
        await ApiLog.create({
            metadata: {
                api_key: apiKey._id,
                end_point: req.protocol + '://' + req.get('host') + req.originalUrl,
                method: req.method
            }
        });
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized!", error: error });
    }
    next();
}

module.exports = checkApiMiddleware;