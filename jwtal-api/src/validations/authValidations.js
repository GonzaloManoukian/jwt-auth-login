const Joi = require('@hapi/joi');

const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
})

const loginValidationSchema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
})

module.exports = {
    registerValidationSchema,
    loginValidationSchema
}