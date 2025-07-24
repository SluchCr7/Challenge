const { Squad , validateSquad } = require('../Modules/Squad')
const expressHandler = require('express-async-handler')

const addSquad = expressHandler(async (req, res) => {
    const { error } = validateSquad(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const squad = new Squad({
        TeamOne: req.body.TeamOne,
        TeamTwo: req.body.TeamTwo,
        title: req.body.title
    })
    await squad.save()
    res.status(201).json(squad)
})

const getAllSquads = expressHandler(async (req, res) => {
    const squads = await Squad.find()
    res.status(200).json(squads)
})

const getSquadById = expressHandler(async (req, res) => {
    const squad = await Squad.findById(req.params.id)
    if (!squad) {
        return res.status(404).json({message : "Squad Not Found"})
    }
    res.status(200).json(squad)
})

const deleteSquad = expressHandler(async (req, res) => {
    const squad = await Squad.findById(req.params.id)
    if (!squad) {
        return res.status(404).json({message : "Squad Not Found"})
    }
    await Squad.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Squad Deleted"})
})

module.exports = {
    addSquad,getAllSquads,getSquadById,deleteSquad
}