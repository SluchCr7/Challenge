const { Team, TeamValidate } = require('../Modules/Team')
const expressHandler = require('express-async-handler')
const path = require('path')
const { cloudUpload, cloudRemove } = require('../Config/cloudUpload')
const fs = require('fs')
const { photoUpload } = require('../Middelwares/uploadPhoto')
const {v2} = require('cloudinary')
const addTeam = async (req, res) => {
    try {
        const { Name, TeamMembers } = req.body
        const image = req.files.image
        const result = await v2.uploader.upload(image[0].path , {resource_type : "image"})
        const team = new Team({
            Name,
            TeamMembers,
            Photo: {
                url: result.secure_url,
                publicId: result.public_id
            }
        })
        await team.save()
        res.status(201).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllTeams = expressHandler(async (req, res) => {
    const teams = await Team.find()
    res.status(200).json(teams)
})

const getTeamById = expressHandler(async (req, res) => {

        // Add additional logic for saving team details to the database if needed

    const team = await Team.findById(req.params.id)
        // Handle any errors that occur during the process
    res.status(200).json(team)
})

const DeleteTeam = expressHandler(async (req, res) => {
    const team = await Team.findById(req.params.id)
    if (!team) return res.status(404).json({ message: 'Team not found' })
    await Team.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Team deleted' })
})

const uploadPhoto = expressHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({message : "No file uploaded"})
    }
    // Get image 
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
    // Upload Image
    const result = await cloudUpload(imagePath)
    // Get Player
    const team = await Team.findById(req.params.id)
    if(team.Photo.publicId !== null){
        await cloudRemove(team.Photo.publicId)
    }
    team.Photo = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await team.save()
    // console.log(result)
    res.status(200).json({
            url: result.secure_url
            , publicId: result.public_id
    })
    fs.unlinkSync(imagePath)
})

module.exports = { addTeam, getAllTeams, getTeamById, DeleteTeam , uploadPhoto }