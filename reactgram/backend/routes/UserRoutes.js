const express = require("express")
const router = express.Router()

//Controller
const {register, signIn} = require("../controllers/UserController")

//Middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation} = require("../middlewares/userValidations")

//Routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/signin", signIn)

module.exports = router