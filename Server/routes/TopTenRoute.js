const express = require('express');
const route = express.Router();

const {
  createQuestion,
  getAllQuestions,
  deleteQuestion
} = require('../Controllers/TopTenController');

route.route('/')
    .post(createQuestion)
    .get(getAllQuestions);
route.route('/:id')
    .delete(deleteQuestion);

module.exports = route