"use strict";
const ObjectId = require('mongoose').Types.ObjectId;

class checkService {

    isObjectIdValid(id, key) {
        const errThr = {errors: {
            [`${key}`]: {
                name : "ValidationError", 
                message : "id is not valid", 
                path: `${key}`, kind: "cast error"
            }
        }, 
        name:"ValidationError"}

        if (!ObjectId.isValid(id)) throw errThr;
        if (!String(new ObjectId(id) === id)) throw errThr;

        return;
    }

    isNull(value) {
        if((value === undefined || value === null) || (value.length < 1)) {
            throw {name: "not found", message: "Data Not Found"};
        };
    }
};

module.exports = checkService;