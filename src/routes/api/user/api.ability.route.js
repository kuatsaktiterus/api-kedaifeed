"use strict";

const express = require('express');
const router = express.Router();
const AbilityController = require('../../../controllers/UserController/Ability.controller');

router.post('/:id', AbilityController.post);

router.get('/', AbilityController.get);

router.get('/:id', AbilityController.getById);

router.get('/user/:id', AbilityController.getByUser);

router.delete('/:id', AbilityController.destroy);

router.patch('/:id', AbilityController.updateForUser);

module.exports = router;