const { Clubs, validateClubs } = require('../Modules/Clubs')
const expressHandler = require('express-async-handler')

const addNewPlayerHistory = expressHandler(async (req, res) => {
    const { error } = validateClubs(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const clubs = new Clubs({
        name: req.body.name,
        teams : req.body.teams
    })
    await clubs.save()
    res.status(201).json(clubs)
})


const getAllPlayersHistory = expressHandler(async (req, res) => {
    const clubs = await Clubs.find()
    res.status(200).json(clubs)
})

const getClubsById = expressHandler(async (req, res) => {
    const clubs = await Clubs.findById(req.params.id)
    if (!clubs) {
        return res.status(404).json({message : "Clubs Not Found"})
    }
    res.status(200).json(clubs)
})

const DeleteClubs = expressHandler(async (req, res) => {
    const clubs = await Clubs.findById(req.params.id)
    if (!clubs) return res.status(404).json({ message: 'Clubs not found' })
    await Clubs.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Clubs deleted' })
})

module.exports = {
    addNewPlayerHistory,
    getAllPlayersHistory,
    getClubsById,
    DeleteClubs
}