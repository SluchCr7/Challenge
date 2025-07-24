const {addSquad,getAllSquads,getSquadById,deleteSquad} = require('../Controllers/SquadController')
const express = require('express')
const route = express.Router()

route.route('/')
    .post(addSquad)
    .get(getAllSquads)

route.route('/:id')
    .get(getSquadById)
    .delete(deleteSquad)
module.exports = route
