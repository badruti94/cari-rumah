const Joi = require("joi");

const houseSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(100000000),
    description: Joi.string().min(25),
    address: Joi.string().min(5),
    image: Joi.any(),  
})

module.exports = {houseSchema}