"use strict";
const responseController = require('../services/response.service');

class controller{
    constructor(code, data, page = null) {
        this.response = new responseController();
        this.code = code;
    }

    response() {
        this.response.code = 200;
        this.response.data = this.data;
        this.response.page = this.page;

        return this.response.response();
    }
}

module.exports = controller;