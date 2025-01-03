const { Guss, ValidateGuss} = require("../Modules/Guss")
const asyncHandler = require('express-async-handler')

const AddGussQuestion = asyncHandler(async (req, res) => {
    const { error } = ValidateGuss(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const guss = new Guss({
        question: req.body.question,
        Answer: req.body.Answer
    })
    await guss.save()
    res.status(200).json(guss)
})

const getAllQusetions = asyncHandler(async (req, res) => {
    const gusss = await Guss.find()
    res.status(200).json(gusss)
})

const getGussById = asyncHandler(async (req, res) => {
    const Guss = await Guss.findById(req.params.id)
    if(!Guss) return res.status(404).json({message : "Qusetion Not Found"})
    res.status(200).json(Guss)
})



const deleteQuestion = asyncHandler(async (req, res) => {
    const guss = await Guss.findById(req.params.id)
    if (!guss) {
        res.status(404).json({ message: 'Question not found' })
        return
    }
    await Guss.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Question deleted' })
})

module.exports  = {AddGussQuestion , getAllQusetions , getGussById , deleteQuestion}