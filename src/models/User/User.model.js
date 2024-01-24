"use strict";
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    nra: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        required: true,
    },
    location: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    in_tenure: {
        type: Boolean,
        default: true
    },
    blood_group: {
        type: String,
        enum: ['A', 'A+', 'A-', 'B', 'B+', 'B-', 'AB', 'AB+', 'AB-', 'O', 'O+', "O-"],
        required: false
    },
    profil_picture: {
        type: String,
        default: "default.png"
    },
    kdcw_experiences: [{
        position: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Kdcw_position'
        },
        start_of_period: {
            type: Date,
            required: true
        },
        end_of_period: {
            type: Date,
            required: true
        }
    }],
    working_experiences: [{
        job: {
            type: String,
            required: true
        },
        start_of_period: {
            type: Date,
            required: true
        },
        end_of_period: {
            type: Date,
            required: true
        }
    }],
    another_porto: [{
        portofolio: {
            type: String,
            required: true
        }
    }],
    abilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ability',
        required: true
    }],
},
    { timestamps: true });


// const validateFullname = [
//     { validator: fullnameValidator, msg: 'error tes1' },
//     { validator: fullnameValidator2, msg: 'tes2' },
// ]
//     // function that validate the fullname
// function fullnameValidator(value) {
//     // `this` is the mongoose document
//     return this.fullname == "123";
// }
// function fullnameValidator2(value) {
//     // `this` is the mongoose document
//     return this.fullname == "234";
// }


module.exports = mongoose.model('User', schema);