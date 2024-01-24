"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name_of_position: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Kdcw_position", schema);