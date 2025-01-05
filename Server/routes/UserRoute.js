const route = require('express').Router()
const { DeleteUser, getAllUsers,makeUserAdmin ,verifyAccount,getUserById,uploadPhoto, RegisterNewUser, LoginUser } = require('../Controllers/UserController')
const photoUpload = require('../Middelwares/uploadPhoto')

route.route("/")
    .get(getAllUsers)

route.route("/:id")
    .get(getUserById)
    .delete(DeleteUser)

route.route("/login")
    .post(LoginUser)

route.route("/register")    
    .post(RegisterNewUser)

route.route("/admin/:id")
    .put(makeUserAdmin)

route.route("/:id/verify/:token")
    .get(verifyAccount)

route.route("/photo")
    .post(photoUpload.single("image"), uploadPhoto)

module.exports = route