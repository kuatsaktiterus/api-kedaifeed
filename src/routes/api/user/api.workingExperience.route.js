"use strict";

const express = require('express');
const router = express.Router();
const WorkingExpController = require('../../../controllers/UserController/WorkingExperience.controller');

router.post('/:id', WorkingExpController.post);

router.get('/:id', WorkingExpController.getByUser);

router.delete('/:id', WorkingExpController.destroy);

module.exports = router;