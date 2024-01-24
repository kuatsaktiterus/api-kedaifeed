"use strict";
class responseService{
    constructor(code) {
        this.code = code;
    }

    response = (data = null, page = null) => {
        let status;
        switch (this.code) {
            case 200:
                status = "OK"
                break;
            case 201:
                status = "CREATED"
                break;
        }

        return {
            code: this.code, 
            status: status,
            data: data,
            page: page
        }
    }

    responseError = (status) => {
        switch (this.error.name) {
            case 'ValidationError':
                this.code = 400;
                this.error = this.error.errors;
                break;
            case 'not found':
                this.code = 404;
                this.error = this.error.errors;
                break;
            default:
                this.code = 500;
        }
        switch(this.code) {
            case 400:
                status = "BAD_REQUEST";
                break;
            case 404:
                status = "NOT_FOUND";
                break;
            case 418:
                status = "I'M_A_TEAPOT";
                break;
            case 500:
                status = "INTERNAL_SERVER_ERROR";
                break;
        }

        return {
            code: this.code, 
            status: status,
            errors: this.error
        }
    }
};

module.exports = responseService;