const mongoose = require('mongoose')
const joi = require('joi')

const Top10Schema = new mongoose.Schema({
    QuestionOne: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 1  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionTwo: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 2  } // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionThree: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 3  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionFour: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 4  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionFive: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 5  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionSix: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 6  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionSeven: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 7  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionEight: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 8  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionNine: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 9  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionTen: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: 10  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionEleven: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: -1  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionTwelve: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: -2  }  // النقاط الحقيقية لهذا الاسم
        }
    ],
    QuestionTherteen: [
        {
        name: { type: String, required: true },   // اسم الفريق أو اللاعب
        value: { type: Number , default: -3  }  // النقاط الحقيقية لهذا الاسم
        }
    ],

}, { timestamps: true })

const TopTen = mongoose.model('TopTen', TopTenSchema)

const validateTopTen = (TopTen) => {
    const schema = {
        QuestionOne: joi.array().required(),
        QuestionTwo: joi.array().required(),
        QuestionThree: joi.array().required(),
        QuestionFour: joi.array().required(),
        QuestionFive: joi.array().required(),
        QuestionSix: joi.array().required(),
        QuestionSeven: joi.array().required(),
        QuestionEight: joi.array().required(),
        QuestionNine: joi.array().required(),
        QuestionTen: joi.array().required(),
        QuestionEleven: joi.array().required(),
        QuestionTwelve: joi.array().required(),
        QuestionTherteen: joi.array().required(),
    }
    return joi.validate(TopTen, schema)
}

module.exports = { TopTen, validateTopTen }