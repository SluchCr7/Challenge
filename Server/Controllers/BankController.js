const { Bank, ValidateBank} = require("../Modules/Bank")
const asyncHandler = require('express-async-handler')

const AddQuestion = asyncHandler(async (req, res) => {
    const { error } = ValidateBank(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const bank = new Bank({
        question: req.body.question,
        Answer: req.body.Answer
    })
    await bank.save()
    res.status(200).json(bank)
})

const getAllQusetions = asyncHandler(async (req, res) => {
    const questionBank = await Bank.find()
    res.status(200).json(questionBank)
})

const getquestionById = asyncHandler(async (req, res) => {
    const question = await Bank.findById(req.params.id)
    if(!question) return res.status(404).json({message : "Qusetion Not Found"})
    res.status(200).json(question)
})



const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Bank.findById(req.params.id)
    if (!question) {
        res.status(404).json({ message: 'Question not found' })
        return
    }
    await Bank.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Question deleted' })
})

module.exports  = {AddQuestion , getAllQusetions , getquestionById , deleteQuestion}