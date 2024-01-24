"use strict";

const express = require('express');
const router = express.Router();
const KdcwPositionController = require('../../../controllers/UserController/KdcwPosition.controller');

router.get('/', KdcwPositionController.get);

router.post('/', KdcwPositionController.post);

module.exports = router;