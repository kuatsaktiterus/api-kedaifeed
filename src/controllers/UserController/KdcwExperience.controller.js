"use strict";
const User = require("../../models/User/User.model");
const controller = require("../controller");


class KdcwExperience extends controller {

    async getByUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(super.response('success', 'success get kdcw experience data', user.kdcw_experiences));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to kdcw experience data error = ${error}`));
        }
    }

    async post(req, res) {
        try {
            const {position, start_of_period, end_of_period} = req.body;
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $push: {
                        kdcw_experiences: {
                            position: position,
                            start_of_period: start_of_period,
                            end_of_period: end_of_period,
                        }
                    }
                }, {new: true}).populate('abilities');

            res.status(200).json(super.response('success', 'success added kdcw experience', user));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to added kdcw experience error = ${error}`));
        }
    }

    async destroy(req, res) {
        try {
            const kdcwExp = await User.findByIdAndUpdate(req.params.id,
                {
                    $pull: {kdcw_experiences: {_id: req.body.kdcw_experience}}
                }, {new: true}).populate('abilities');
            res.status(200).json(super.response('success', 'success deleted kdcw experience', kdcwExp));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to deleted kdcw experience error = ${error}`));
        }
    }
}

module.exports = new KdcwExperience();