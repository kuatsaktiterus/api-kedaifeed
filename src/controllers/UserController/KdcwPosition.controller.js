"use strict";
const KdcwPosition = require('../../models/User/Kdcw_position.model');
const controller = require('../controller');

class PositionController extends controller {
    async get(req, res) {
        try {
            const position = await KdcwPosition.find();
            res.status(200).json(super.response('success', 'success get positions data', position));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to retrieve position data error = ${error}`));
        }
    }

    async getById(req, res) {
        try {
            const position = await KdcwPosition.findById(req.params.id);
            res.status(200).json(super.response('success', 'success get positions data', position));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to retrieve position data error = ${error}`));
        }
    }

    async post(req, res) {
        try {
            const position = new KdcwPosition({name_of_position: req.body.name_of_position});

            const savedPosition = await position.save();
            res.status(200).status(500).json(super.response('success', 'success save positions data', savedPosition));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to save position data error = ${error}`));
        }
    }
}

module.exports = new PositionController();