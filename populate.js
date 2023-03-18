require('dotenv').config()

const connectDB = require('./db/connectDB')

const productModel = require('./models/DishesModel')

const productsData = require('./products.json')

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        await productModel.deleteMany()
        await productModel.create(productsData)
        console.log('connected')
        process.exit(0)
       
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()