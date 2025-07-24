const asyncHandler = require('express-async-handler');
const { TopTen, validateTopTen } = require('../Modules/TopTen');

// @desc    إنشاء أسئلة جديدة كاملة (13 سؤال مرة واحدة)
const createQuestion = asyncHandler(async (req, res) => {
  const { error } = validateTopTen(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

    const newQuestionSet = new TopTen({
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,
    question5: req.body.question5,
    question6: req.body.question6,
    question7: req.body.question7,
    question8: req.body.question8,
    question9: req.body.question9,
    question10: req.body.question10,
    question11: req.body.question11,
    question12: req.body.question12,
    question13: req.body.question13
    });
    await newQuestionSet.save();

    res.status(201).json({ message: 'Top10 Questions Created Successfully', data: newQuestionSet });
});

// @desc    جلب كل الأسئلة (كل الجولات)
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await TopTen.find().sort({ createdAt: -1 });
  res.status(200).json({ questions });
});

// @desc    حذف مجموعة أسئلة بناءً على ID
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await TopTen.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Question set not found' });
  }
  res.status(200).json({ message: 'Question set deleted successfully' });
});

module.exports = {
  createQuestion,
  getAllQuestions,
  deleteQuestion
};
