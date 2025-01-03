const asyncHandler = require('express-async-handler')
const { Auction, ValidateAuction } = require('../Modules/Auction')


/**
 * @desc Add Round
 * @route POST /api/round
 * @access Public
 */

const addAuction = asyncHandler(async (req, res) => {
    const { error } = ValidateAuction(req.body)
    if (error) return res.status(400).json({message : error.details[0].message})
    const auction = new Auction({
        question : req.body.question,
    })
    await auction.save()
    res.status(200).json(auction)
})

/**
 * @desc get All Auction
 * @route GET /api/auction
 * @access Public
 */

const getAllAuction = asyncHandler(async (req, res) => {
    const auctionQuestios = await Auction.find()
    res.status(200).json(auctionQuestios)
})


/**
 * @desc get Auction By Id
 * @route GET /api/auction/:id
 * @access Public
 */

const getAuctionById = asyncHandler(async (req, res) => {
    const auction = await Auction.findById(req.params.id)
    res.status(200).json(auction)
})

/**
 * @desc Delete Auction
 * @route DELETE /api/auction/:id
 * @access Public
 */

const deleteAuction = asyncHandler(async (req, res) => {
    const auction = await Auction.findById(req.params.id)
    if (!auction) return res.status(404).json({ message: 'Auction not found' })
    await Auction.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Auction deleted' })
})




module.exports = {  
    addAuction,
    getAllAuction,
    getAuctionById,
    deleteAuction,
}