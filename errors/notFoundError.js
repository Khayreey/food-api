const { StatusCodes } = require('http-status-codes')
const CustomError = require('./custom-error')

class NotfoundError extends CustomError {
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotfoundError