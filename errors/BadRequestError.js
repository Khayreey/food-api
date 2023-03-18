const { StatusCodes } = require('http-status-codes')
const CustomError = require('./custom-error')

class BadRequestError extends CustomError {
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError