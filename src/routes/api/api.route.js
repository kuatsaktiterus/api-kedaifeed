"use strict";
const express = require('express');
const router = express.Router();

const UserApiRoute = require('./user/api.user.route');
const FeedApiRoute = require('./feed/api.feed.route');

router.use('/user/', UserApiRoute);

router.use('/feed/', FeedApiRoute);

module.exports = router;