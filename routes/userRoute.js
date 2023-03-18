const express = require('express')
const router = express.Router()
const {uploadHandler} = require("../middleware/upload");
const {register , login} = require('../controllers/userController')
router.route('/login').post(login)
router.post('/register' , uploadHandler , register )

module.exports = router