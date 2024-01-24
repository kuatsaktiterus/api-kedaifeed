"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    metadata: {
        api_key: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'ApiKey'
        },
        end_point: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true
        }
    }
},
{
    timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'seconds'
    },
    expireAfterSeconds: 3600 * 24 * 7
});

module.exports = mongoose.model("ApiLog", schema);