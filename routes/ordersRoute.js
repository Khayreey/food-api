const express = require('express')
const router = express.Router()
const {
    addOrder , 
    getAllOrderes
} = require('../controllers/ordersController')

router.route('/').post(addOrder).get(getAllOrderes)
module.exports = router