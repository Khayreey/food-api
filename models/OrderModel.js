const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderedBy : {
        type : mongoose.Types.ObjectId , 
        ref : 'Users' ,
        required : [true , "must provide the user"]
    } , 
    orderedDishes : {
        type : mongoose.Types.ObjectId , 
        ref : 'Checkout' , 
        required : [true , "you must provide dishe"] ,
    } , 
    price : {
        type : Number , 
        required : [true , "must calculate order Price"]
    } ,
    status : {
        type : String , 
        enum : ['pending' , 'done' , 'cancel' , "onWay"] ,
        default : 'pending'
    } , 
    userInformation : {
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
    } , 
    cart : {
        type : [{
            orderDishe : {
                type : mongoose.Types.ObjectId , 
                ref : 'Dishes' ,
                required : [true , 'you must provide ordered Dishes'] , 
            } , 
            amount : {
                type : Number , 
                default : 1 , 
                min: 1 ,
                max: 10 , 
                required : true
            } 
            
        }] , 
        required: true , 
        validate: [(value) => value.length > 0, 'you must add cart items'],
    }
       
    
           
        
}, {timestamps : true})

module.exports = mongoose.model("Orders" , OrderSchema)