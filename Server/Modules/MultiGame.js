const mongoose = require('mongoose')
const joi = require('joi')

const MultiGameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    game1_password: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Password',
        required: true
    },
    game2_guess: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guss',
        required: true
    },
    game3_offside: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offside',
        required: true
    },
    game4_picture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    game5_bank: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bank',
            required: true
        }
    ]
}, { timestamps: true })

const MultiGame = mongoose.model('MultiGame', MultiGameSchema)

const ValidateMultiGame = (obj) => {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().allow("", null),
        game1_password: joi.string().required(),
        game2_guess: joi.string().required(),
        game3_offside: joi.string().required(),
        game4_picture: joi.string().required(),
        game5_bank: joi.array().items(joi.string()).length(12).required()
    })
    return schema.validate(obj)
}

module.exports = { MultiGame, ValidateMultiGame }
