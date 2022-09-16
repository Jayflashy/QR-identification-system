const Joi = require('joi')

const validationSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required()
})

module.exports = {
    validationSchema
}