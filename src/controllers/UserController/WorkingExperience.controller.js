"use strict";

const User = require('../../models/User/User.model');
const controller = require('../controller');

class WorkingController extends controller {

    async getByUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(super.response('success', 'success get working experience data', user.working_experiences));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to working experience data error = ${error}`));
        }
    }

    async post(req, res) {
        try {
            const {job, start_of_period, end_of_period} = req.body;
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $push: {
                        working_experiences: {
                            job: job,
                            start_of_period: start_of_period,
                            end_of_period: end_of_period,
                        }
                    }
                }, {new: true}).populate('abilities');

            res.status(200).json(super.response('success', 'success added working experience', user));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to added working experience error = ${error}`));
        }
    }

    async destroy(req, res) {
        try {
            const workExp = await User.findByIdAndUpdate(req.params.id,
                {
                    $pull: {working_experiences: {_id: req.body.work_experience}}
                }, {new: true}).populate('abilities');
            res.status(200).json(super.response('success', 'success deleted work experience', workExp));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to deleted work experience error = ${error}`));
        }
    }
}

module.exports = new WorkingController();