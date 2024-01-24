"use strict";
const User = require('../../models/User/User.model');
const controller = require('../controller');
const SaveAllPortoService = require('../../services/saveAllPorto.service');
const responseService = require('../../services/response.service');
const checkService = require('../../services/check.service');

class UserController extends controller{
    constructor() {
        super();
        this.response = new responseService();
        this.check = new checkService();
    }

    getById = async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('abilities');

            this.response.code = 200;
            res.status(200).json(this.response.response(user));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    async save(req, res) {
        try {
            const {fullname, nra, telephone, email} = req.body;

            const user = new User({
                fullname: fullname,
                nra: nra,
                telephone: telephone,
                email: email
            });

            const savedUser = await user.save();
            res.status(201).json(super.response('success', 'success saving user', savedUser));
        } catch (err) {
            if (err.name === 'ValidationError') { 
                return res.status(400).json(new responseController(
                    400, "BAD_REQUEST", null, err.errors
                ));
            } else {
                return res.status(500).json(err);
                return res.status(500).json((new newcontroller(500, "INTERNAL_SERVER_ERROR", null, error.name)).response());
            }
        }
    }

    /**
     * 
     * profile controller
     * 
     * updateProfile = To update profile information(name, nra, and status of member (tenure))
     * updatePrivateInformation = updte private information(telephone, email, blood group, location)
     * */ 
    async updateProfile(req, res) {
        try {
            const {fullname, nra, in_tenure} = req.body;
            const query = {_id: req.params.id};
            const update = { 
                $set: {
                    fullname: fullname,
                    nra: nra,
                    in_tenure: in_tenure
            }};
            const option = { new: true};

            const updatedUser = await User.findOneAndUpdate(query, update, option); 
            res.status(200).json(super.response('success', 'success update users profile data', updatedUser));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to update users data error = ${error}`));
        }
    }

    async updatePrivateInformation(req, res) {
        try {
            const {telephone, email, blood_group, location} = req.body;
            const query = {_id: req.params.id};
            const update = { 
                $set: {
                    telephone: telephone,
                    email: email,
                    blood_group: blood_group,
                    location: location,
                }
            };
            const option = { new: true};

            const updatedUser = await User.findOneAndUpdate(query, update, option); 
            res.status(200).json(super.response('success', 'success update users private data', updatedUser));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to update users data error = ${error}`));
        }
    }

    // insert all portofolio form
    async insertAllPortoData(req, res) {
        try {
            const saveporto = new SaveAllPortoService(req);
            await saveporto.saveAllPorto();
            res.status(201).json(super.response('success', 'success saved all porto users data'));
        } catch (error) {
            res.status(500).json(super.response('error', `failed to saved all porto users data error = ${error}`));
        }
    }
}

module.exports = new UserController();