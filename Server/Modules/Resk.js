const mongoose = require('mongoose')
const joi = require('joi')

const reskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Easy: {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: 5
        }
    },
    Medium: {
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 10
    }
    },
    Hard: {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: 20
        }
    },
    Expert: {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            default: 40
        }
    }
});

const Resk = mongoose.model('Resk', reskSchema)

const validateResk = (resk) => {
    const schema = joi.object({
        name: joi.string().required(),
        Easy: joi.object().required(),
        Medium: joi.object().required(),
        Hard: joi.object().required(),
        Expert: joi.object().required(),
    })
    return schema.validate(resk)
}

const updateResk = (resk) => {
    const schema = joi.object({
        name: joi.string(),
        Easy: joi.object(),
        Medium: joi.object(),
        Hard: joi.object(),
        Expert: joi.object(),
    })
    return schema.validate(resk)
}
module.exports = { Resk, validateResk, updateResk }