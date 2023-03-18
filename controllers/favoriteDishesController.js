const {StatusCodes} = require('http-status-codes')
const favoriteModel = require('../models/FavoriteModel')
const {BadRequestError , NotFoundError , AuthError} = require('../errors/index'); 


const getAllFavoriteDishes = async (req,res)=>{
    const favoriteDishes = await favoriteModel.find({createdBy : req.user.userId}).populate('disheInformation')
    res.status(StatusCodes.OK).json({ favoriteDishes : favoriteDishes , nbHits : favoriteDishes.length , ok : true})
}

const addFavoriteDishe = async (req,res)=>{
    console.log(req.body)
    const isDisheFavorite = await favoriteModel.exists({createdBy :req.user.userId , disheInformation : req.body.disheInformation })
    console.log(isDisheFavorite) 
    if(isDisheFavorite) {
        throw new BadRequestError('already exist')
    }
    const favoriteDishe = await favoriteModel.create({createdBy : req.user.userId , disheInformation : req.body.disheInformation})
    res.status(StatusCodes.CREATED).json({favoriteDishe})
}

const deleteFavoriteDishe = async (req,res)=>{
   const {user : {userId} , params : {id : favoriteDisheId}  } = req

   const deletedDishe = await favoriteModel.findOneAndRemove({
    _id: favoriteDisheId,
    createdBy: userId,
  })
  if (!deletedDishe) {
    throw new NotFoundError(`No dishe with id ${favoriteDisheId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllFavoriteDishes , 
    addFavoriteDishe , 
    deleteFavoriteDishe
}