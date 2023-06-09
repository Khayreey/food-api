const {CustomError} = require('../errors/index')
const {StatusCodes} = require('http-status-codes')
const errorHandler = (err,req,res,next)=> {
    console.log(err)
    let customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR , 
        msg : err.message || 'something went wrong try later ...'
    }
    if(err.name && err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if(err.name && err.name === 'CastError'){
        customError.msg = `Not item Found with id ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    if(err.code && err.code === 11000) {
        customError.msg = `Duplicate ${Object.keys(err.keyValue)} this one "${Object.values(err.keyValue)}" is already use`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    return res.status(customError.statusCode).json({msg : customError.msg})
}

module.exports = errorHandler