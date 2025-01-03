const asyncHandler = require('express-async-handler')
const { Password, ValidPass } = require("../Modules/Password")
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')
const {v2} = require('cloudinary')
const addPassPlayer = asyncHandler(async (req, res) => {
    
    const { error } = ValidPass(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const image = req.files.image
    const result = await v2.uploader.upload(image[0].path , {resource_type : "image"})
    const PassPlayer = new Password({
        name: req.body.name,
        keywords: req.body.keywords,
        Photo: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })
    await PassPlayer.save()
    res.status(201).json(PassPlayer);
    fs.unlinkSync(image[0].path);
})

const getAllPlayers = asyncHandler(async (req, res) => {
    const players = await Password.find()
    res.status(200).json(players)
})

const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message : "No file uploaded"})
    }
    // Get image 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    // Upload Image
    const result = await cloudUpload(imagePath)
    // Get Player
    const player = await Password.findById(req.params.id)
    if(player.profilePhoto.publicId !== null){
        await cloudRemove(player.profilePhoto.publicId)
    }
    player.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await player.save()
    // console.log(result)
    res.status(200).json({
            url: result.secure_url
            , publicId: result.public_id
    })
    fs.unlinkSync(imagePath)
})

const deletePlayer = asyncHandler(async (req, res) => {
    const player = await Password.findById(req.params.id)
    if (!player) {
        return res.status(404).json({message : "player Not Found"})
    }
    await Password.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Player Removed Sucessfully"})
})




module.exports = {uploadPhoto , addPassPlayer , getAllPlayers , deletePlayer }