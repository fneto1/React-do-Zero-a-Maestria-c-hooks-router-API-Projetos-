const express = require("express")
const router = express.Router()

//rotas de usuário
router.use('/api/users', require('./UserRoutes'))

//rotas de fotos
router.use('/api/photos', require('./PhotoRoutes'))

//test route
router.get('/', (req, res) => { res.send("Api working") })

module.exports = router