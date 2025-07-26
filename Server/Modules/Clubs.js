const mongoose = require('mongoose')
const joi = require('joi')

const ClubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teams : [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true })

const Clubs = mongoose.model('Clubs', ClubsSchema)

const validateClubs = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        teams : joi.array().required()
    })
    return schema.validate(data)
}

module.exports = {Clubs, validateClubs}