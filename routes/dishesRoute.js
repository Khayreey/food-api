const { getAllDishes } = require('../controllers/dishesController')
const express = require('express')

const router = express.Router()

router.get('/' , getAllDishes)

module.exports = router