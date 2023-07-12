const User = require('../models/User')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const jwtSecret = process.env.JWT_SECRET

// generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d"
    })
}

//register user and sign in
const register = async (req, res) => {

    const { name, email, password } = req.body

    //checar se o usuário existe
    const user = await User.findOne({ email })

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] })

        return
    }

    //criando o hash
    const salt = await bcrypt.genSalt()
    const passowrdHash = await bcrypt.hash(password, salt)

    //criando o objeto usuário
    const newUser = await User.create({
        name,
        email,
        password: passowrdHash
    })

    //caso haja sucesso na criação do usuário, retornar o token
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, tente novamente mais tarde."] })

        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })

}

//função de login
const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    //verificar se usuário existe
    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })

        return
    }

    //verificar se a senha confere
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha inválida"] })

        return
    }

    //por fim, retornar usuário com o token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })

}

//get current logged in user
const getCurrentUser = async (req, res) => {
    //recuperar o req.user criado na função de authGuard
    const user = req.user

    res.status(200).json(user)
}

//update user
const update = async (req, res) => {

    //recupera as informações do body
    const { name, password, bio } = req.body

    let profileImage = null

    //console.log(req.file)
    //console.log(req.baseUrl)

    //caso venha imagem na requisição
    if (req.file) {
        profileImage = req.file.filename
    }

    //recuperar o req.user criado na função de authGuard
    const reqUser = req.user

    //recuperar o user
    //o id do usuario vem da seguinte forma: _id: new ObjectId("64ac6015e50b1fa9edffbc6d")
    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if (name) {
        user.name = name
    }

    if (password) {
        //generate password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    if (profileImage) {
        user.profileImage = profileImage
    }

    if (bio) {
        user.bio = bio
    }

    await user.save()

    res.status(200).json(user)
}

//get user by id
const getUserById = async (req, res) => {

    const { id } = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")

        //verificar se o usuário existe
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] })
            return
        }

        res.status(200).json(user)
    } catch (error) {
        return res.status(422).json({ errors: ["Usuário não encontrado."] })

    }

}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}