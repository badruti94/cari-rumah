const { house: houseModel, user: userModel } = require('../../models')

exports.getHouseByUsername = async (req, res, next) => {
    try {
        const { page = 1, perPage = 4 } = req.query

        const houses = await houseModel.findAll({
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username'],
                where: {
                    username: req.params.username,
                }
            },
            offset: (parseInt(page) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            order: [['id', 'ASC']],
        })

        res.status(200).send({
            data: houses
        })
    } catch (error) {
        next(error)
    }
}