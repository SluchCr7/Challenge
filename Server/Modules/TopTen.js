
const mongoose = require('mongoose');
const joi = require('joi');

const TopTenSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questionOne : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 1
    }
  },
  questionTwo : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 2
    }
  },
  questionThree : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 3
    }
  },
  questionFour : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 4
    }
  },
  questionFive : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 5
    }
  },
  questionSix : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 6
    }
  },
  questionSeven : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 7
    }
  },
  questionEight : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 8
    }
  },
  questionNine : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 9
    }
  },
  questionTen : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : 10
    }
  },
  questionEleven : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : -1
    }
  },
  questionTwelve : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : -2
    }
  },
  questionThirteen : {
    name : {
      type : String,
      required : true
    },
    value : {
      type : Number,
      default : -3
    }
  }
}, { timestamps: true });

const TopTen = mongoose.model('TopTen', TopTenSchema);

const validateTopTen = (obj) => {
  const questionSchema = joi.object({
    name: joi.string().required()
  });

  const schema = joi.object({
    title: joi.string().required(),
    questionOne: questionSchema,
    questionTwo: questionSchema,
    questionThree: questionSchema,
    questionFour: questionSchema,
    questionFive: questionSchema,
    questionSix: questionSchema,
    questionSeven: questionSchema,
    questionEight: questionSchema,
    questionNine: questionSchema,
    questionTen: questionSchema,
    questionEleven: questionSchema,
    questionTwelve: questionSchema,
    questionThirteen: questionSchema
  });

  return schema.validate(obj);
};


module.exports = { TopTen, validateTopTen };
