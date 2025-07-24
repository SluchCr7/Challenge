const {addSquad,getAllSquads,getSquadById,deleteSquad} = require('../Controllers/SquadController')
const route = require('express').Router()


route.route('/')
    .post(addSquad)
    .get(getAllSquads)

route.route('/:id')
    .get(getSquadById)
    .delete(deleteSquad)
module.exports = route
