"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ApiKey", schema);