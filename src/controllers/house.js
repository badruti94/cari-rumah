const { house: houseModel, user: userModel } = require('../../models')
const { uploadToCloudinary } = require('../utils/upload')
const { houseSchema } = require('../validations/house')
const { imageValidation } = require('../validations/image')

exports.createHouse = async (req, res, next) => {
    try {
        const { error } = houseSchema.validate(req.body)
        if (error) throw error
        imageValidation(req.files, 'image')
        const image = await uploadToCloudinary(req.files.image)
        const house = await houseModel.create({
            ...req.body,
            image,
            user_id: req.userId,
        })
        res.status(201).send({
            message: 'Create house success',
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

exports.getAllHouse = async (req, res, next) => {
    try {
        const { page = 1, perPage = 4 } = req.query

        const houses = await houseModel.findAll({
            include: {
                model: userModel,
                as: 'user',
                attributes: ['username']
            },
            offset: (parseInt(page) - 1) * parseInt(perPage),
            limit: parseInt(perPage),
            order: [['id', 'ASC']]
        })

        res.status(200).send({
            data: houses
        })
    } catch (error) {
        next(error)
    }
}

exports.getHouseById = async (req, res, next) => {
    try {
        const house = await houseModel.findByPk(req.params.id, {
            include: {
                model: userModel,
                as: 'user',
                attributes: ['name', 'username', 'phone_number']
            }
        })

        res.status(200).send({
            data: house
        })
    } catch (error) {
        next(error)
    }
}

exports.updateHouse = async (req, res, next) => {
    try {
        const { error } = houseSchema.validate(req.body)
        if (error) throw error

        if (req.files) {
            imageValidation(req.files, 'image')
            req.body.image = await uploadToCloudinary(req.files.image)
        }
        if(req.body.image === ''){
            delete req.body.image
        }
        const house = await houseModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Update house success'
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteHouse = async (req, res, next) => {
    try {
        const house = await houseModel.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Delete house success'
        })
    } catch (error) {
        next(error)
    }
}

exports.soldHouse = async (req, res, next) => {
    try {
        const house = await houseModel.update({ sold: true }, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: 'Sold house success'
        })
    } catch (error) {
        next(error)
    }
}