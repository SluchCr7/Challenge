const route = require('express').Router()
const { addOffside, getAllOffside, getOffsideById, deleteOffside } = require('../Controllers/OffsideController')

route.route('/')    
    .post(addOffside)
    .get(getAllOffside)

route.route('/:id') 
    .get(getOffsideById)
    .delete(deleteOffside)

module.exports = route