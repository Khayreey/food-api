const express = require('express')
const router = express.Router()
const  {
    getAllFavoriteDishes , 
    addFavoriteDishe , 
    deleteFavoriteDishe
}  = require('../controllers/favoriteDishesController')


router.route('/').post(addFavoriteDishe).get(getAllFavoriteDishes)
router.route('/:id').delete(deleteFavoriteDishe)

module.exports = router