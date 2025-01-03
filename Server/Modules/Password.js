const mongoose = require('mongoose')
const joi = require('joi')

const PasswordSchema = new mongoose.Schema({
    Photo: {
        type : Array,
        required : true
    },
    name: {
        type: String,
        required : true
    },
    keywords: [
        {
            type: String,
            // required: true
        }
    ]
},{timestamps : true})

const Password = mongoose.model('Password', PasswordSchema)

const ValidPass = (obj) => {
    const schema = joi.object({
        name: joi.string().required(),
        keywords : joi.array()
    })
    return schema.validate(obj)
}

module.exports = {ValidPass , Password}