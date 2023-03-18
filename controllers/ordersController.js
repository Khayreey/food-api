const orderModel = require('../models/OrderModel')
const checkoutModel = require('../models/CheckoutModel')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError } = require('../errors/index'); 
const getAllOrderes = async(req,res)=>{
    const orders = await orderModel.find({orderedBy : req.user.userId}).sort({'updatedAt' : -1})
     .populate({path : 'orderedDishes' , populate : {
         path : 'cart.orderDishe'
    }})
    res.status(StatusCodes.OK).json({ orders : orders , nbHits : orders.length , ok : true})
}

const addOrder = async(req,res)=>{
    const {user : {userId : orderedBy} , body : {orderedDishes , userInformation}} = req
    const checkoutOrder = await checkoutModel.findOne({_id : orderedDishes , orderedBy : orderedBy}).populate('cart.orderDishe')
    if(!checkoutOrder){
        throw new NotFoundError(`ther is no checkout order with ${orderedDishes} id`)
    }
    const cartItems = checkoutOrder.cart
    
    if(cartItems.length === 0) {
        throw new BadRequestError('must added cart dishes')
    }
    const totalPrice = cartItems.reduce((partialSum, a) => partialSum + +a.orderDishe.price*a.amount, 0);
    const order = await orderModel
    .create(
        {orderedBy : orderedBy ,
         price : totalPrice , 
         orderedDishes:orderedDishes , 
         userInformation : userInformation , 
         cart : cartItems
        })
    await checkoutModel.findOneAndRemove({_id : orderedDishes , orderedBy : orderedBy})
    res.status(StatusCodes.CREATED).json({order})
}

module.exports = {
    addOrder , 
    getAllOrderes
}