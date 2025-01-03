const asyncHandler = require('express-async-handler')
const { Question, ValidateQuistion, UpdateQuistion } = require('../Modules/Question')
const express = require('express')

/**
 * @desc Add Question
 * @route POST /api/questions
 * @access Public
 */

const AddQuistion = asyncHandler(async (req, res) => {
    const question = ValidateQuistion(req.body)
    if (question.error) {
        res.status(400).json({ message: question.error.details[0].message })
        return
    }
    const quistion = new Question({
        Answer: question.value.Answer,
        Clos: question.value.Clos
    })
    await quistion.save()
    res.status(200).json(quistion)
})

/**
 * @desc get All questuins
 * @route GET /api/questions
 * @access Public
 */

const getAllQuestions = asyncHandler(async (req, res) => {
    const quistions = await Question.find()
    res.status(200).json(quistions)
})

/**
 * @desc get Question By Id
 * @route GET /api/questions/:id
 * @access Public
 */

const getQuestionById = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        res.status(404).json({ message: 'Question not found' })
        return
    }
    res.status(200).json(question)
})

/**
 * @desc Update Question
 * @route PUT /api/questions/:id
 * @access Public
 */

const updateQuestion = asyncHandler(async (req, res) => {
    const { error } = UpdateQuistion(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const question = await Question.findByIdAndUpdate(req.params.id, {
        $set: {
            Answer: req.body.Answer,
            Clos : req.body.Clos
        }
    },{new: true})
    await question.save()
    res.status(200).json(question)
})


/**
 * @desc Delete Question
 * @route DELETE /api/questions/:id
 * @access Public
 */

const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)
    if (!question) {
        res.status(404).json({ message: 'Question not found' })
        return
    }
    await Question.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Question deleted' })
})
module.exports = { AddQuistion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion }