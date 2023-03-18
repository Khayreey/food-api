require('dotenv').config()
require('express-async-errors')
const {upload} = require('./middleware/upload')
const express = require('express')
const bodyParser = require("body-parser");
const cors=require("cors");
const formData = require('express-form-data');
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
const connectDB = require('./db/connectDB')
const dishesRoute = require('./routes/dishesRoute')
const userRoute = require('./routes/userRoute')
const favoriteDishesRoute = require('./routes/favoriteRoute')
const checkOutRoute = require('./routes/checkoutRoute')
const orderesRoute = require('./routes/ordersRoute')

const authHandler = require('./middleware/authHandler')
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

const app = express()
app.use('/uploads', express.static('uploads'));
app.use(upload.single('profileImage'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use('/api/v1/dishes' , dishesRoute)
app.use('/api/v1/auth' , userRoute)
app.use('/api/v1/favorite' , authHandler , favoriteDishesRoute)
app.use('/api/v1/checkout' , authHandler , checkOutRoute)
app.use('/api/v1/orderes' , authHandler , orderesRoute)

app.use(errorHandler)
app.use(notFound)


const port = process.env.PORT || 3000

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port , ()=>{
            console.log(`app is listening on ${port} port`)
        })
    }
    catch (err){
       console.log(err)
    }
}
start()