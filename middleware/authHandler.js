const jwt = require('jsonwebtoken')
require('dotenv').config()
const {authError , BadRequestError} = require('../errors/index')

const authHandler = (req,res,next)=>{

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer'))
    {
        throw new BadRequestError('auth Header Must Provided')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {userId : payload.userId}
        next()
    }
    catch(err){
        throw new authError('PROTECTED you are not allow')
    }

}

module.exports = authHandler