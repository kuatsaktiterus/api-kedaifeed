"use strict";

const express = require('express');
const router = express.Router();
const PostApiRoute = require("./api.post.route");

router.use('/post/', PostApiRoute);

module.exports = router;