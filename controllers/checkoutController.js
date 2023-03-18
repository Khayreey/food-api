const CheckoutModel  = require('../models/CheckoutModel')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError , NotFoundError , AuthError} = require('../errors/index')


const getAllOrderedDishes = async (req,res)=>{
    const allOrderedDishes = await CheckoutModel.find({orderedBy : req.user.userId}).populate('orderedDishe')
    res.status(StatusCodes.OK).json({ ordered : allOrderedDishes , nbHits : allOrderedDishes.length , ok : true})
}

const addOrderedDishe = async(req,res)=>{
 
 const isUserOrder = await CheckoutModel.exists({orderedBy : req.user.userId})
 let orderedDishe
 if(isUserOrder){
    const isDisheExist = await CheckoutModel.exists({ 'cart.orderDishe'  : req.body.orderedDishe })
    if(isDisheExist){
        throw new BadRequestError('this dishe is already added')
    }

    orderedDishe = await CheckoutModel
    .findOneAndUpdate({orderedBy : req.user.userId} ,
      { $addToSet : {cart : { orderDishe : req.body.orderedDishe ,amount: req.body.amount } } }  , 
      { new : true , runValidators : true } )
 }
   else {
    orderedDishe = await CheckoutModel.create({orderedBy : req.user.userId , cart : {orderDishe : req.body.orderedDishe , amount : req.body.amount }})
   } 

 res.status(StatusCodes.CREATED).json({orderedDishe})
}

const updateOrderedDishe = async (req,res)=>{

    const {user : {userId} , params : {id : orderedDisheId} , body : {amount}} = req
    if(!amount){
        throw new BadRequestError('you must provide amount')
    }

    const updatedOrder = await CheckoutModel.findOneAndUpdate(
         {orderedBy : userId , 'cart._id' : orderedDisheId } ,
         {'cart.$.amount' : amount } ,
         {new : true , runValidators : true}
    )
    if(!updatedOrder){
        throw new NotFoundError(`there is no order by ${orderedDisheId} id`)
    }

    res.status(StatusCodes.OK).json({updatedOrder})
}

const deleteOrderedDishe = async (req,res)=>{
    const { user : {userId} , params : {id : orderedDisheId} } = req
    console.log(userId)
    console.log(orderedDisheId)
    const updatedOrder = await CheckoutModel.findOneAndUpdate(
        {orderedBy : userId , 'cart._id' : orderedDisheId } ,
         { $pull : {cart : {_id : orderedDisheId}} } ,
         {new : true , runValidators : true}
    )
    if(!updatedOrder) {
        throw new NotFoundError(`there is no order by ${orderedDisheId} id`)
    }

    const isOrderedEmpty = await CheckoutModel.exists({
        orderedBy : userId , cart : {$size : 0}
    })
    if(isOrderedEmpty){
       await CheckoutModel.findOneAndRemove({orderedBy : userId})
       res.status(StatusCodes.OK).send()
    }
    res.status(StatusCodes.OK).json({updatedOrder})
}
module.exports = {
    getAllOrderedDishes , 
    addOrderedDishe ,
    updateOrderedDishe , 
    deleteOrderedDishe
}