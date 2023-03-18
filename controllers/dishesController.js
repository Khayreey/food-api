const dishesModel = require('../models/DishesModel')
const {NotFoundError} = require('../errors/index')
const getAllDishes = async (req,res)=>{
    const dishes = await dishesModel.find({})
    if(dishes.length <= 0){
        throw new NotFoundError('no dishes found')
    }
    res.status(200).json({dishes : dishes , nbHits : dishes.length , ok : true})
}

module.exports = {getAllDishes}