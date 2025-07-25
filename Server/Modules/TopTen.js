const mongoose = require('mongoose');
const joi = require('joi');

const questionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const TopTenSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: {
    type: [questionSchema],
    validate: [arr => arr.length === 13, 'يجب أن يحتوي على 13 سؤال بالضبط']
  },
}, { timestamps: true });

const TopTen = mongoose.model('TopTen', TopTenSchema);

const validateTopTen = (obj) => {
  const schema = joi.object({
    title: joi.string().required(),
    questions: joi.array().length(13).items(
      joi.object({
        name: joi.string().required(),
        value: joi.number().required()
      })
    )
  });
  return schema.validate(obj);
};

module.exports = { TopTen, validateTopTen };
