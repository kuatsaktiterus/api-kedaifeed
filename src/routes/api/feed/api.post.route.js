"use strict";

const express = require('express');
const router = express.Router();
const PostController = require('../../../controllers/FeedController/Post.controller');
const uploadMediaService = require('../../../services/uploadMedia.service');

router.get('/:id', PostController.getById);

router.get('/user/:id', PostController.getByUser);

router.post('/:id', uploadMediaService.uploadMedia(), PostController.saveStatus);

router.get('/', PostController.get);

// router.delete('/:id', PostController.destroy);

module.exports = router;