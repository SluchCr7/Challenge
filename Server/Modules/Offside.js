const mongoose = require("mongoose")
const joi = require('joi')


const offSideSchema = new mongoose.Schema({
    Clo: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Offside = mongoose.model("Offside", offSideSchema)


const validateOffsidee = (obj) => {
    const schema = joi.object({
        Clo: joi.string().required(),
    })
    return schema.validate(obj)
}


module.exports = { Offside, validateOffsidee }