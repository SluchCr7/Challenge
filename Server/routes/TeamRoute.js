const { addTeam, DeleteTeam, getAllTeams, getTeamById , uploadPhoto } = require('../Controllers/TeamController')
const route = require('express').Router()
const photoUpload = require('../Middelwares/uploadPhoto')
const upload = require('../Middelwares/Upload')
route.route('/')
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]),addTeam)
    .get(getAllTeams)

route.route('/:id')
    .get(getTeamById)
    .delete(DeleteTeam)

route.route("/photo/:id")
    .post(photoUpload.single("image"), uploadPhoto)
module.exports = route