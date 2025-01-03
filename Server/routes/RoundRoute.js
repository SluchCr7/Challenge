const route = require('express').Router()
const { addRound, getAllRound, getRoundById, deleteRound } = require('../Controllers/RoundController')


route.route('/')
    .post(addRound)
    .get(getAllRound)

route.route('/:id')
    .get(getRoundById)
    .delete(deleteRound)

module.exports = route