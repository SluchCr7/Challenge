const { MultiGame, ValidateMultiGame } = require('../Modules/MultiGame')
const asyncHandler = require('express-async-handler')

// @desc    Create a new MultiGame Episode
// @route   POST /api/multigame
// @access  Admin/Private
const createEpisode = asyncHandler(async (req, res) => {
    const { error } = ValidateMultiGame(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const episode = new MultiGame({
        title: req.body.title,
        description: req.body.description,
        game1_password: req.body.game1_password,
        game2_guess: req.body.game2_guess,
        game3_offside: req.body.game3_offside,
        game4_picture: req.body.game4_picture,
        game5_bank: req.body.game5_bank
    })

    await episode.save()
    res.status(201).json(episode)
})

// @desc    Get all MultiGame Episodes
// @route   GET /api/multigame
// @access  Public
const getAllEpisodes = asyncHandler(async (req, res) => {
    const episodes = await MultiGame.find().sort({ createdAt: -1 })
    res.status(200).json(episodes)
})

// @desc    Get populated MultiGame Episode by ID
// @route   GET /api/multigame/:id
// @access  Public
const getEpisodeById = asyncHandler(async (req, res) => {
    const episode = await MultiGame.findById(req.params.id)
        .populate('game1_password')
        .populate('game2_guess')
        .populate('game3_offside')
        .populate('game4_picture')
        .populate('game5_bank')

    if (!episode) return res.status(404).json({ message: 'Episode Not Found' })
    res.status(200).json(episode)
})

// @desc    Delete a MultiGame Episode
// @route   DELETE /api/multigame/:id
// @access  Admin/Private
const deleteEpisode = asyncHandler(async (req, res) => {
    const episode = await MultiGame.findById(req.params.id)
    if (!episode) return res.status(404).json({ message: 'Episode Not Found' })

    await MultiGame.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Episode deleted successfully' })
})

module.exports = {
    createEpisode,
    getAllEpisodes,
    getEpisodeById,
    deleteEpisode
}
