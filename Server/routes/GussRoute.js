const { AddGussQuestion, getAllQusetions, getGussById, deleteQuestion } = require("../Controllers/GussController")
const route = require('express').Router()

route.route("/")
    .post(AddGussQuestion)
    .get(getAllQusetions)
route.route("/:id")
    .delete(deleteQuestion)
    .get(getGussById)


module.exports = route