/*
Notes for AC2
.env content;
PORT=4200
DB_NAME="Cluster0"
DB_USER = "teomendonca1510"
DB_PASS = "adm"
JWT_SECRET="admsecret"
*/
require('dotenv').config()
const userController = require('./controllers/autentication/users')
const loginController = require('./controllers/login')
const clientController = require('./controllers/client')
const todoController = require('./controllers/autentication/todo')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const servidor = express()
servidor.use(express.json())
servidor.use(cookieParser())

//variavel global
const PORT = process.env.PORT
const DATABASE_NAME = process.env.DB_NAME
const DATABASE_USER = process.env.DB_USER
const DATABASE_PASSWORD = process.env.DB_PASS
const DATABASE_URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.8rneedh.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`

servidor.use("/login", loginController)
servidor.use("/users", userController)
servidor.use("/clients", clientController)
servidor.use("/todo", todoController)

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

