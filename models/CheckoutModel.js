const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    orderedBy : {
        type : mongoose.Types.ObjectId , 
        ref : 'Users' , 
        required : [true , 'you must provide user']
    } ,
    cart : [
        {
            orderDishe : {
                type : mongoose.Types.ObjectId , 
                ref : 'Dishes' ,
                required : [true , 'you must provide ordered Dishes'] , 
                unique : true
            } , 
            amount : {
                type : Number , 
                default : 1 , 
                min: 1 ,
                max: 10
            } 
            
        }
    ]
} , {timestamps : true} )

module.exports = mongoose.model('Checkout' , checkoutSchema)