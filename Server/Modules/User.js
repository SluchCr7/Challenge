const mongoose = require('mongoose')
const joi = require('joi')

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    nickName :{
        type: String,
        default : "@Footboll"
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    profilePhoto:{
        type : Object, 
        default:{
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId : null
        }
    },
    isAdmain: {
        type: Boolean,
        default : false
    },
    isVerify: {
        type: Boolean,
        default : false
    },
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

const ValidateUser = (obj) => {
    const schema = joi.object({
        Name: joi.string().required(),
        Password: joi.string().required(),
        Email : joi.string().required()
    })
    return schema.validate(obj)
}
const LoginValidate = (obj) => {
    const schema = joi.object({
        Password: joi.string().required(),
        Email : joi.string().required()
    })
    return schema.validate(obj)
}

module.exports = {User , ValidateUser , LoginValidate}