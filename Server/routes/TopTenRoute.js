const {createQuestion,getAllQuestions,deleteQuestion} = require('../Controllers/TopTenController');
const express = require('express');
const route = express.Router();


route.route('/')
    .post(createQuestion)
    .get(getAllQuestions);
route.route('/:id')
    .delete(deleteQuestion);

module.exports = route