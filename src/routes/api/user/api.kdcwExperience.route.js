"use strict";

const express = require('express');
const router = express.Router();
const KdcwExperienceController = require('../../../controllers/UserController/KdcwExperience.controller');

router.get('/:id', KdcwExperienceController.getByUser);

router.post('/:id', KdcwExperienceController.post);

router.delete('/:id', KdcwExperienceController.destroy);

module.exports = router;