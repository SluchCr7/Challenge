const mongoose = require('mongoose')
const joi = require('joi')

const TeamSchema = new mongoose.Schema({
    Photo: {
        type: Array,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    TeamMembers : [
        {
            type: String,
            required: true
        }
    ],
}, { timestamps: true })

const Team = mongoose.model('Team', TeamSchema)

const TeamValidate = (obj) => {
    const schema = joi.object({
        Name: joi.string().required(),
        Team : joi.array().required()
    })
    return schema.validate(obj)
}

module.exports = { Team, TeamValidate }