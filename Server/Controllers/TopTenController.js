const asyncHandler = require('express-async-handler');
const { TopTen, validateTopTen } = require('../Modules/TopTen');

// @desc    إنشاء أسئلة جديدة (13 سؤال)
const createQuestion = asyncHandler(async (req, res) => {
  const { error } = validateTopTen(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newQuestionSet = new TopTen({
    title: req.body.title,
    questionOne: req.body.questionOne,
    questionTwo: req.body.questionTwo,
    questionThree: req.body.questionThree,
    questionFour: req.body.questionFour,
    questionFive: req.body.questionFive,
    questionSix: req.body.questionSix,
    questionSeven: req.body.questionSeven,
    questionEight: req.body.questionEight,
    questionNine: req.body.questionNine,
    questionTen: req.body.questionTen,
    questionEleven: req.body.questionEleven,
    questionTwelve: req.body.questionTwelve,
    questionThirteen: req.body.questionThirteen,
  });

  await newQuestionSet.save();
  res.status(201).json(newQuestionSet);
});


// @desc    جلب كل الأسئلة
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await TopTen.find().sort({ createdAt: -1 });
  res.status(200).json({ questions });
});

// @desc    حذف
const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await TopTen.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Question set not found' });
  }
  res.status(200).json({ message: 'Question set deleted successfully' });
});

module.exports = {
  createQuestion,getAllQuestions,deleteQuestion
};
