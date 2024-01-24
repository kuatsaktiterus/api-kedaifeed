"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    post_content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model("Post", schema);