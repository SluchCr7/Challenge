const route = require('express').Router()
const { CreateCategory, updateCategory, getAllReskCategory, getReskCategoryByid, DeleteResk } = require('../Controllers/ReskController')


route.route('/')
    .post(CreateCategory)
    .get(getAllReskCategory)

route.route('/:id')
    .delete(DeleteResk)
    .put(updateCategory)
    .get(getReskCategoryByid)

module.exports = route