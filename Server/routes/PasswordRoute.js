const photoUpload = require('../Middelwares/uploadPhoto')
const route = require("express").Router()
const {uploadPhoto , getAllPlayers , addPassPlayer, deletePlayer} = require('../Controllers/PasswordController')
const upload = require('../Middelwares/Upload')
route.route("/photo/:id")
    .post(photoUpload.single("image"), uploadPhoto)

route.route("/")
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]),addPassPlayer)
    .get(getAllPlayers)
route.route("/:id")
    .delete(deletePlayer)
module.exports = route