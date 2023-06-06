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
    
    const {name, email, password} = req.body;

    //check if user exists
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
    }

    //Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    //if user was created succesfully, return token

    if(!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde."]})

        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })


}


const login = async (req, res) => {
    res.send("login")
}

module.exports = {
    register,
    login,
}