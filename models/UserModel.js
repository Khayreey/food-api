const mongoose = require('mongoose')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    profileImage : {
        type : String 
    } ,
    phone : {
        type :String , 
        required : [true , 'you must provide phone number'] ,
        maxLength : 11 ,
        minLength : 11
    } ,
    name : {
        type : String , 
        required : [true , 'you must provide name'] , 
        minLength : 3 , 
        maxLength : 20
    } , 
    email : {
        type : String , 
        required : [true , 'you must provide email'] , 
        match : [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'please provide valid email'],
        unique : true
    } , 
    password : {
        type : String , 
        required : [true , 'you must provide password'] , 
        minLength : 8 , 
    } ,
    country : {
        type : String , 
        required : [true , 'you must provide country']
    } ,
    city : {
        type : String , 
        required : [true , 'you must provide city']
    } , 
    address : {
        type : String , 
        required : [true , "you must provide address"] , 
        maxLength : 30 , 
        minLength : 8
    }
})
userSchema.pre('save' , async function(){
    // hashing our password to save it as bits 
    // generate random bits for hashing
    const randomBits = await bcrypt.genSalt(10)
    // hashing our password with the salt we define
    this.password = await bcrypt.hash(this.password , randomBits)
})
userSchema.methods.createJWT = function(){
    return jwt.sign({userId : this._id , name : this.name} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword = async function(pass){
    const isMatch = await bcrypt.compare(pass , this.password)
    return isMatch
}
module.exports = mongoose.model( "Users",userSchema)