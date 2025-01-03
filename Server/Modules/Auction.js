const mongoose = require('mongoose')
const joi = require('joi')

const AuctionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Auction = mongoose.model("Auction", AuctionSchema)

const ValidateAuction = (obj) => {
    const schema = joi.object({
        question: joi.string().required(),
    })
    return schema.validate(obj)
}

module.exports = { Auction, ValidateAuction }