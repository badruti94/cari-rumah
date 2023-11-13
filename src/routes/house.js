const express = require('express')
const router = express.Router()
const houseController = require('../controllers/house')
const { mustRole } = require('../middlewares/auth')

router.post('/', mustRole('user'), houseController.createHouse)
router.get('/', houseController.getAllHouse)
router.get('/:id', houseController.getHouseById)
router.put('/:id', houseController.updateHouse)
router.delete('/:id', houseController.deleteHouse)
router.patch('/:id/sold', houseController.soldHouse)

module.exports = router