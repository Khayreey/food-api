const express = require('express')
const router = express.Router()

const {
    getAllOrderedDishes , 
    addOrderedDishe ,
    updateOrderedDishe , 
    deleteOrderedDishe
} = require('../controllers/checkoutController')

router.route('/').get(getAllOrderedDishes).post(addOrderedDishe)

router.route('/:id').delete(deleteOrderedDishe).patch(updateOrderedDishe)

module.exports = router