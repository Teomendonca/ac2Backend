require('dotenv').config()

const userController = require('./controllers/autentication/users')
const loginController = require('./controllers/login')
const clientController = require('./controllers/client')

const mongoose = require('mongoose')
const express = require('express')
const servidor = express()
servidor.use(express.json())

//variavel global
const PORT = 4200
const DATABASE_NAME = "Cluster0"
const DATABASE_USER = "teomendonca1510"
const DATABASE_PASSWORD = "adm"
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

