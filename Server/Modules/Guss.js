const mongoose = require('mongoose')
const joi = require('joi')

const GussSchema = new mongoose.Schema({
    question: {
        type: String,
        required : true
    },
    Answer: {
        type: String,
        required : true
    }
}, { timestamps: true })

const Guss = mongoose.model("Guss" , GussSchema)

const ValidateGuss = (obj) => {
    const schema = joi.object({
        question: joi.string().required(),
        Answer: joi.string().required()
    })
    return schema.validate(obj)
}

module.exports = {Guss , ValidateGuss}