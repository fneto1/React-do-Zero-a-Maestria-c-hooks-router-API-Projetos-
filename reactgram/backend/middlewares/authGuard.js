const User = require("../models/User")
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const authGuard = async (req, res, next) => {

    //console.log(req.headers.authorization)

    //console.log(req.headers["authorization"])

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    //console.log(token)
    //verificar se o header tem um token
    if (!token) {
        return res.status(401).json({ errors: ["Acesso negado."] })
    }

    //verificar validade do token
    try {

        const verified = jwt.verify(token, jwtSecret) //retorna um objeto com todas as propriedades que possuem no token (vide função generateToken - UserController)
        //console.log(verified)

        req.user = await User.findById(verified.id).select("-password")
        //console.log(req.user)

        next()

    } catch (error) {
        return res.status(401).json({ errors: ["Token inválido."] })
    }
}

module.exports = authGuard