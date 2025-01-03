const mongoose = require("mongoose");
const joi = require("joi");
const RoundSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    examples: [
        {
            type: String,
            required: true
        }
    ],
}, { timestamps: true })

const Round = mongoose.model("Round", RoundSchema)

const ValidateRound = (obj) => {    
    const schema = joi.object({ 
        question: joi.string().required(),
        examples: joi.array().required()
    })
    return schema.validate(obj)
}

module.exports = { Round, ValidateRound }