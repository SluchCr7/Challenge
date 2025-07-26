const express = require('express')
const route = express.Router()

const {
    addNewPlayerHistory,
    getAllPlayersHistory,
    getClubsById,
    DeleteClubs
} = require('../Controllers/ClubsController')



route.route('/')
    .post(addNewPlayerHistory)
    .get(getAllPlayersHistory)

route.route('/:id')
    .get(getClubsById)
    .delete(DeleteClubs)


module.exports = route