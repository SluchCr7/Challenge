const asyncHandler = require('express-async-handler')
const { updateResk, validateResk, Resk } = require('../Modules/Resk')


/**
 * @desc Add Resk
 * @route POST /api/resk
 * @access Public
 */

const CreateCategory = asyncHandler(async (req, res) => {
    const {error} = validateResk(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const resk = new Resk({
        name: req.body.name,
        Easy: req.body.Easy,
        Medium: req.body.Medium,
        Hard: req.body.Hard,
        Expert: req.body.Expert,
        // Category: req.body.Category
    })
    await resk.save()
    res.status(200).json(resk)
})

/**
 * @desc Update Resk
 * @route PUT /api/resk/:id
 * @access Public
 */

const updateCategory = asyncHandler(async (req, res) => {
    const { error } = updateResk(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const resk = await Resk.findByIdAndUpdate(req.body.id, {
        $set: {
            name: req.body.name,
            Easy: resk.body.Easy,
            Medium: resk.body.Medium,
            Hard: resk.body.Hard,
            Expert: resk.body.Expert,
            // Category: req.body.Category
        }
    }, { new: true })
    await resk.save()
    res.status(200).json(resk)
})

/**
 * @desc get All Resk
 * @route GET /api/resk
 * @access Public
 */

const getAllReskCategory = asyncHandler(async (req, res) => {
    const resk = await Resk.find()
    res.status(200).json(resk)
})

/**
 * @desc get Resk By Id
 * @route GET /api/resk/:id
 * @access Public
 */

const getReskCategoryByid = asyncHandler(async (req, res) => {
    const resk = await Resk.findById(req.params.id)
    res.status(200).json(resk)
})

/**
 * @desc Delete Resk
 * @route DELETE /api/resk/:id
 * @access Public
 */


const DeleteResk = asyncHandler(async (req, res) => {
    const resk = await Resk.findById(req.params.id)
    if (!resk) return res.status(404).json({ message: 'Resk not found' })
    await Resk.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Resk deleted' })
})

module.exports = { CreateCategory, updateCategory, getAllReskCategory, getReskCategoryByid , DeleteResk }