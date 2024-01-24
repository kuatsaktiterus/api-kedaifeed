"use strict";

const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers/UserController/User.controller');
const WorkingExpApiRoute = require('./api.workingExperience.route');
const AbilityApiRoute = require('./api.ability.route');
const KdcwExperienceApiRoute = require('./api.kdcwExperience.route');
const KdcwPositionApiRoute = require('./api.kdcwPosition.route');
const AnotherPortApiRoute = require('./api.anotherPorto.route');

/**
 * 
 * Portofolio route
 */
router.use('/working-experience/', WorkingExpApiRoute);

router.use('/ability/', AbilityApiRoute);

router.use('/kdcw-experience/', KdcwExperienceApiRoute);

router.use('/position/', KdcwPositionApiRoute);

router.use('/another-porto/', AnotherPortApiRoute);

// insert all route
router.post('/all-porto/:id', UserController.insertAllPortoData);


/**
 * 
 * User Route
 */
router.get('/:id', UserController.getById);

router.post('/', UserController.save);

// profil edit
router.patch('/edit_profile/:id', UserController.updateProfile);

router.patch('/edit_private_info/:id', UserController.updatePrivateInformation);

module.exports = router;