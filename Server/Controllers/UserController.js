const { User, ValidateUser, LoginValidate } = require('../Modules/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Verification = require('../Modules/VerificationToken')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendMail')
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')
const {v2} = require('cloudinary')
/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */

const RegisterNewUser = asyncHandler(async (req, res) => {
    const { error } = ValidateUser(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const userExist = await User.findOne({ Email: req.body.Email })
    if (userExist) return res.status(400).send("User already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt)
    const user = new User({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: hashPassword,
    })

    await user.save()
    const VerificationToken = new Verification({
        userId: user._id,
        tokenVer: crypto.randomBytes(32).toString('hex'),
    })
    await VerificationToken.save()

    const link = `${process.env.DOMAIN_NAME}/Auth/users/${user._id}/verify/${VerificationToken.tokenVer}`

    const htmlTemp = `
        <h4>Dear ${user.Name}!</h4>

        <p>Thank you for signing up with Challenge Football!. Please verify your email address to complete your registration.</p>
        
        <p><a href="${link}">Verify Email</a></p>
        
        <p>If you did not sign up for this account, you can safely ignore this email.</p>
        
        <span>Best regards,</span>
        
        <span>The Challenge Football Team</span>
    `
    await sendEmail(user.Email , "Verify your Email" , htmlTemp)

    res.status(201).json({ message: "User Created Successfully and we sent an email now , go to verify your email" });
})

/**
 * @desc Login
 * @route GET /api/auth/login
 * @access Public
 */

const LoginUser = asyncHandler(async (req, res) => {
    const { error } = LoginValidate(req.body)
    if (error) {
        res.status(400).json({message : error.details[0].message})
    }
    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
        res.status(400).json({message : "Email or Password are not Correct"})
    }
    const validPassword = await bcrypt.compare(req.body.Password , user.Password)
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }
    if (!user.isVerify) {
        let verificationToken = await Verification.findOne({
            userId: user._id,
        })
        if (!verificationToken) {
            verificationToken = new Verification({
                userId: user._id,
                tokenVer: crypto.randomBytes(32).toString('hex'),
            })
            await verificationToken.save()
        }
        const link = `${process.env.DOMAIN_NAME}/Auth/users/${user._id}/verify/${verificationToken.tokenVer}`
        const htmlTemp = `
            <h4>Dear ${user.Name}!</h4>

            <p>Thank you for signing up with Challenge Football!. Please verify your email address to complete your registration.</p>
            
            <p><a href="${link}">Verify Email</a></p>
            
            <p>If you did not sign up for this account, you can safely ignore this email.</p>
            
            <span>Best regards,</span>
            
            <span>The Challenge Football Team</span>
        `
        await sendEmail(user.Email, 'Verify Email', htmlTemp)
        return res.status(400).json({ message: 'Email not verified' })
    }
    const token = jwt.sign({ _id: user._id , isAdmain: user.isAdmain }, process.env.TOKEN_SECRET);
    const { Password, ...others } = user._doc
    res.send({ ...others, token });
})

/**
 * @desc get All Users
 * @route GET /api/auth
 * @access Public
 */

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

/**
 * @desc get user by id
 * @route GET /api/auth/:id
 * @access Public
 */

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json(user)
})


/**
 * @desc delete User
 * @route DELETE /api/auth/:id
 * @access Public
 */

const DeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "User Deleted Successfully"})
})

/**
 * @desc Make User Admin
 * @route PUT /api/admin/:id
 * @access Public
 */
const makeUserAdmin = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from the request parameters

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Toggle the isAdmin property
        user.isAdmain = !user.isAdmain;
        // Save the updated user
        await user.save();
        return res.status(200).json({
            message: `User's admin status updated successfully`,
            user,
        });
    } catch (error) {
        console.error('Error toggling admin status:', error);
        return res.status(500).json({ message: 'An error occurred while updating admin status' });
    }
};

/**
 * @desc verify Account
 * @route PUT /api/auth/:id/verify/:token
 * @access Public
 */

const verifyAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }
    const verificationToken = await Verification.findOne({ userId: user._id , tokenVer: req.params.token })
    if (!verificationToken) {
        res.status(404)
        throw new Error('Verification token not found')
    }
    user.isVerify = true
    await user.save()
    await Verification.findByIdAndDelete(verificationToken._id)
    res.status(200).json({ message: 'Email verified' })
})


/**
 * @desc update Profile Photo
 * @route PUT /api/auth/photo
 * @access Public
 */


const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message : "No file uploaded"})
    }
    // Get image 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    // Upload Image
    const result = await cloudUpload(imagePath)
    // Get Player
    const user = await User.findById(req.user._id)
    if(user.profilePhoto.publicId !== null){
        await cloudRemove(user.profilePhoto.publicId)
    }
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save()
    // console.log(result)
    res.status(200).json({
            url: result.secure_url
            , publicId: result.public_id
    })
    fs.unlinkSync(imagePath)
})

module.exports = {DeleteUser ,makeUserAdmin , getAllUsers , getUserById , RegisterNewUser , LoginUser, verifyAccount, uploadPhoto}