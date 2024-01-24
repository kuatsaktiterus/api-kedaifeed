"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name_of_ability: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Ability", schema);