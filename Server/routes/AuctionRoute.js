const route = require('express').Router()
const { addAuction, getAllAuction, getAuctionById, deleteAuction } = require('../Controllers/AuctionController')


route.route('/')
    .post(addAuction)
    .get(getAllAuction)

route.route('/:id')
    .get(getAuctionById)
    .delete(deleteAuction)
module.exports = route