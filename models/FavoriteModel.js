const mongoose = require('mongoose')

const favoriteDishesSchema = new mongoose.Schema({
    createdBy : {
        type: mongoose.Types.ObjectId ,
        ref : 'Users' ,
        required : [true , 'you must provide user'],
        unique : true
    } , 
    disheInformation : {
        type : mongoose.Types.ObjectId , 
        ref : 'Dishes' , 
        required : [true , "you must provide dishe"] , 
        
    } 
    
} , {timestamps : true} )

module.exports = mongoose.model('Favorite' , favoriteDishesSchema)