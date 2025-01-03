const { AddQuestion, getAllQusetions, getquestionById, deleteQuestion } = require('../Controllers/BankController')
const route = require('express').Router()

route.route('/')
    .post(AddQuestion)
    .get(getAllQusetions)

route.route('/:id')
    .get(getquestionById)
    .delete(deleteQuestion)
module.exports = route