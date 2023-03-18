const UserModel = require('../models/userModel')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError , AuthError} = require('../errors/index') 
const multer = require('multer')
const upload = require("../middleware/upload");

const register = async (req,res)=>{
     //console.log(req.body
    console.log(req.body)
    let user
    if(req.file){
         user = await UserModel.create({profileImage : req.file.path , ...req.body })
    }
     else {
         user = await UserModel.create({...req.body})
     }
     const token = user.createJWT()
     res.status(StatusCodes.CREATED).json({ user , token })
}

const login = async (req,res)=>{
    const {email , password} = req.body
    console.log(email)
    const user = await UserModel.findOne({email})
    if(!user){
        throw new NotFoundError('this email dosent exist try register')
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new AuthError('Wrong password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user , token})
}

module.exports = {register , login}