"use strict";
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const api_auth = require('./src/middlewares/api-keycheck.middleware');
const apiRoute = require('./src/routes/api/api.route');
const rateLimiter = require('express-rate-limit');
require('dotenv').config();

const limiter = rateLimiter.rateLimit({
    windowMs: 60 * 1000, 
	max: 120,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter)
app.use(api_auth);
app.use(express.json());

app.use('/api/v1/', apiRoute);
app.get('/', (req, res) => {res.send("Hello World")});

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("DB Connected");
});


app.listen(port, () => {
    console.log(`Server Running And Listening ${port}`);
});