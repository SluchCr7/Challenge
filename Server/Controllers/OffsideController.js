const asyncHandler = require('express-async-handler')
const { Offside, validateOffsidee } = require('../Modules/Offside')


/**
 * @desc Add Offside
 * @route POST /api/offside
 * @access Public
 */

const addOffside = asyncHandler(async (req, res) => {
    const { error } = validateOffsidee(req.body)
    if (error) return res.status(400).json({message : error.details[0].message})
    const offside = new Offside({
        Clo : req.body.Clo
    })
    await offside.save()
    res.status(200).json(offside)
})

/**
 * @desc get All Offside
 * @route GET /api/offside
 * @access Public
 */

const getAllOffside = asyncHandler(async (req, res) => {
    const offsideQuestios = await Offside.find()
    res.status(200).json(offsideQuestios)
})


/**
 * @desc get Offside By Id
 * @route GET /api/offside/:id
 * @access Public
 */

const getOffsideById = asyncHandler(async (req, res) => {
    const offside = await Offside.findById(req.params.id)
    res.status(200).json(offside)
})

/**
 * @desc Delete Offside
 * @route DELETE /api/offside/:id
 * @access Public
 */

const deleteOffside = asyncHandler(async (req, res) => {
    const offside = await Offside.findById(req.params.id)
    if (!offside) return res.status(404).json({ message: 'Offside not found' })
    await Offside.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Offside deleted' })
})

module.exports = {  
    addOffside,
    getAllOffside,
    getOffsideById,
    deleteOffside
}