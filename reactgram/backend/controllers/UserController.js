//importando model do usuário
const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET 

// genereate user token
const generateToken = (id) => {
    return jwt.sign(
        {id},
        jwtSecret,
        {expiresIn: "7d"}
    )
}

//register user and signIn
const register = async (req, res) => {
    res.send("Registro")
}

const signIn = async (req, res) => {
    res.send("Signed In")
}

module.exports = {
    register,
    signIn,
}