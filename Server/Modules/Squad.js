const mongoose = require('mongoose')
const joi = require('joi')

const SquadSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    TeamOne: {
        name: {
            type: String,
            required: true
        },
        members : [
            {
                type: String,
                required: true
            }
        ]
    },
    TeamTwo: {
        name: {
            type: String,
            required: true
        },
        members : [
            {
                type: String,
                required: true
            }
        ]
    },
}, { timestamps: true })

const Squad = mongoose.model('Squad' , SquadSchema)

const validateSquad = (squad) => {
    const schema = joi.object({
        title: joi.string().required(),
        TeamOne: joi.object({
            name: joi.string().required(),
            members: joi.array().items(joi.string().required()).required()
        }).required(),
        TeamTwo: joi.object({
            name: joi.string().required(),
            members: joi.array().items(joi.string().required()).required()
        }).required()
    })
    return schema.validate(squad)
}

module.exports = { Squad , validateSquad }
