const mongoose = require('mongoose')
const joi = require('joi')

const quistionSchema = mongoose.Schema({
    Answer: {
        type: String,
        required: true
    },
    Clos:
    [
        {
            type: String,
            required: true
        }
    ]
},{timestamps: true})

const Question = mongoose.model('Question', quistionSchema)

const ValidateQuistion = (quistion) => {
    const schema = joi.object({
        Answer: joi.string().required(),
        Clos : joi.array().required()
    })
    return schema.validate(quistion)
}

const UpdateQuistion = (quistion) => {
    const schema = joi.object({
        Answer: joi.string(),
        Clos : joi.array()
    })
    return schema.validate(quistion)
}

module.exports= {ValidateQuistion , UpdateQuistion , Question}