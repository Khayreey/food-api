const { StatusCodes } = require('http-status-codes')
const CustomError = require('./custom-error')

class AuthError extends CustomError {
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = AuthError