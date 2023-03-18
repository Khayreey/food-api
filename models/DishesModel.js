const mongoose = require('mongoose')

const dishesSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'dishe name must provided'],
        minLength : [3 , 'dishe name must be at least 3 characters']
    } , 
    price : {
        type : Number , 
        required : [true , 'dishe name must provided']
    } , 
    rating : {
        type : Number , 
        default : 4 
    } ,
    createdAt : {
        type : Date , 
        default : Date.now()
    },
    category : {
        type : String , 
        enum : {
            values : ['Burger' , 'Pizza' , 'Hotdog' , 'Taco' , 'Snack' , 'Drink'] , 
            message : '${VALUE} is not consider as a category'
        }
    },
    imgSrc : {
        type : String , 
        required : [true , 'dishe image must provided']
    }
})

module.exports = mongoose.model('Dishes' , dishesSchema)