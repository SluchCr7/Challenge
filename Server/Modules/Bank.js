const mongoose = require('mongoose')
const joi = require('joi')

const BankSchema = new mongoose.Schema({
    question: {
        type: String,
        required : true
    },
    Answer: {
        type: String,
        required : true
    }
}, { timestamps: true })

const Bank = mongoose.model("Bank" , BankSchema)

const ValidateBank = (obj) => {
    const schema = joi.object({
        question: joi.string().required(),
        Answer: joi.string().required()
    })
    return schema.validate(obj)
}

module.exports = {Bank , ValidateBank}