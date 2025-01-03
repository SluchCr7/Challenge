const asyncHandler = require('express-async-handler')
const { Round, ValidateRound } = require('../Modules/Round')


/**
 * @desc Add Round
 * @route POST /api/round
 * @access Public
 */

const addRound = asyncHandler(async (req, res) => {
    const { error } = ValidateRound(req.body)
    if (error) return res.status(400).json({message : error.details[0].message})
    const round = new Round({
        question : req.body.question,
        examples : req.body.examples
    })
    await round.save()
    res.status(200).json(round)
})

/**
 * @desc get All Round
 * @route GET /api/round
 * @access Public
 */

const getAllRound = asyncHandler(async (req, res) => {
    const roundQuestios = await Round.find()
    res.status(200).json(roundQuestios)
})


/**
 * @desc get Round By Id
 * @route GET /api/round/:id
 * @access Public
 */

const getRoundById = asyncHandler(async (req, res) => {
    const round = await Round.findById(req.params.id)
    res.status(200).json(round)
})

/**
 * @desc Delete Round
 * @route DELETE /api/round/:id
 * @access Public
 */

const deleteRound = asyncHandler(async (req, res) => {
    const round = await Round.findById(req.params.id)
    if (!round) return res.status(404).json({ message: 'Round not found' })
    await Round.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Round deleted' })
})

module.exports = {  
    addRound,
    getAllRound,
    getRoundById,
    deleteRound
}