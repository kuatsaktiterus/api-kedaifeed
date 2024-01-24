"use strict";

const express = require('express');
const router = express.Router();
const AnotherPortofolioController = require('../../../controllers/UserController/AnotherPortofolio.controller');

router.get('/:id', AnotherPortofolioController.getByUser);

router.post('/:id', AnotherPortofolioController.post);

router.delete('/:id', AnotherPortofolioController.destroy);

module.exports = router;