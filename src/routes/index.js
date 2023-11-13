const express = require('express')
const router = express.Router()
const authRoute  = require('./auth')
const houseRoute = require('./house')
const userRoute = require('./user')

router.use('/auth', authRoute)
router.use('/house', houseRoute)
router.use('/user', userRoute)

module.exports = router