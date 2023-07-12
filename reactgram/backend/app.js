require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT;

const app = express()

//config json and form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Solve CORS
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//DB config
require("./config/db")

//import routes
const router = require('./routes/Router')

//use routes
app.use(router)

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
})
