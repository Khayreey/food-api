const mongoose = require('mongoose')

const connectDB = (url)=> {
    return mongoose.connect(url , {
        useFindAndModify:false , 
        useNewUrlParser : true , 
        useCreateIndex : true , 
        useUnifiedTopology : true
    })
}


module.exports = connectDB