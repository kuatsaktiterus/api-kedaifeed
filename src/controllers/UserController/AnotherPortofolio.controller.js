"use strict";

const User = require('../../models/User/User.model');
const checkService = require('../../services/check.service');
const responseService = require('../../services/response.service');
const controller = require('../controller');

class PortofolioController extends controller {
    constructor() {
        super();
        this.response = new responseService();
        this.check = new checkService();
    }

    getByUser = async (req, res) => {
        try {
            const porto = await User.findById(req.params.id);

            this.response.code = 200;
            res.status(200).json(this.response.response(porto.another_porto));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    async post(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $push: {
                        another_porto: {
                            portofolio: req.body.portofolio,
                        }
                    }
                }, {new: true}).populate('abilities');

            res.status(200).json(super.response('success', 'success added another portofolio', user));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to added another portofolio error = ${error}`));
        }
    }

    async destroy(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $pull: {another_porto: {_id: req.body.another_porto}}
                }, {new: true}).populate('abilities');
            res.status(200).json(super.response('success', 'success deleted kdcw experience', user));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to deleted kdcw experience error = ${error}`));
        }
    }
}

module.exports = new PortofolioController();