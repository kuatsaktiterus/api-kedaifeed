"use strict";

const User = require('../../models/User/User.model');
const Ability = require('../../models/User/Ability.model');
const responseService = require('../../services/response.service');
const checkService = require('../../services/check.service');

class AbilityController {
    constructor() {
        this.response = new responseService();
        this.check = new checkService();
    }

    get = async (req, res) => {
        try {
            const abilities = await Ability.find();
            this.check.isNull(abilities);
            
            this.response.code = 200;
            res.status(200).json(this.response.response(abilities));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    getById = async (req, res) => {
        try {
            const abilityId = req.params.id;

            this.check.isObjectIdValid(abilityId, "_id");

            const abilities = await Ability.findById(abilityId);
            this.check.isNull(abilities);

            this.response.code = 200;
            res.status(200).json(this.response.response(abilities));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    getByUser = async (req, res) => {
        try {
            const userId = req.params.id;

            this.check.isObjectIdValid(userId, "_id");
            const user = await User.findById(userId).populate("abilities");

            this.response.code = 200;
            res.status(200).json(this.response.response(user.abilities));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }
    
    post = async (req, res) => {
        try {
            const userId = req.params.id;

            const abilities = new Ability({
                name_of_ability: req.body.ability
            });

            this.check.isObjectIdValid(userId, "_id");
            const user = await User.findById(userId).populate('abilities');
            this.check.isNull(abilities);

            await abilities.save();
            user.abilities.push(abilities);
            await user.save();

            this.response.code = 201;
            res.status(201).json(this.response.response(user));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    updateForUser = async (req, res) => {
        try {
            const id = req.params.id;
            
            const updatePull = {
                $pull: {abilities: req.body.ability} 
            }
            const updatePush = {
                $push: {abilities: req.body.new_ability} 
            }

            const body = req.body;
            
            this.check.isObjectIdValid(id, "_id");
    
            Object.entries(body).forEach(([key, value]) => this.check.isObjectIdValid(value, key));

            const user = await User.findById(id);
            this.check.isNull(user);
               
            await user.updateOne(updatePull);

            const resUser = await User.findByIdAndUpdate(id, updatePush, {new: true});

            this.response.code = 200;
            res.status(200).json(this.response.response(resUser));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }

    destroy = async (req, res) => {
        try {
            await Ability.findByIdAndDelete(req.body.ability);

            const abilities = await Ability.aggregate([
                {$match: { _id: mongoose.Types.ObjectId(req.body.ability) }}
            ]);

            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $pull: {abilities: {_id: req.body.ability}}
                }, {new: true}).populate('abilities');
            this.check.isNull(user);

            this.response.code = 200;
            res.status(200).json(this.response.response(user));
        } catch (error) {
            this.response.error = error;
            const responseError = this.response.responseError();
            return res.status(responseError.code).json(responseError);
        }
    }
};

module.exports = new AbilityController();