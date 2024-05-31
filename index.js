require('dotenv').config()

const userController = require('./controllers/autentication/users')
const loginController = require('./controllers/login')
const clientController = require('./controllers/client')

const mongoose = require('mongoose')
const express = require('express')
const servidor = express()
servidor.use(express.json())

//variavel global
const PORT = process.env.PORT
const DATABASE_NAME = process.env.DB_NAME
const DATABASE_USER = process.env.DB_USER
const DATABASE_PASSWORD = process.env.DB_PASS
const DATABASE_URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.8rneedh.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`

servidor.use("/login", loginController)
servidor.use("/users", userController)
servidor.use("/clients", clientController)

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Banco de dados conectado com sucesso")
        servidor.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(`Erro ao conectar no bando de dados. ${error}`)
    })

