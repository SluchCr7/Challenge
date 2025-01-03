const express = require('express')
const route = express.Router()
const { AddQuistion, getAllQuestions, getQuestionById, updateQuestion ,deleteQuestion } = require('../Controllers/QuestionController')

route.route('/')
    .post(AddQuistion)
    .get(getAllQuestions)

route.route('/:id')
    .get(getQuestionById)
    .put(updateQuestion)
    .delete(deleteQuestion)

module.exports = route