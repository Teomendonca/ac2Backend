const UserModel = require("../models/user")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')

const userController = express.Router()

userController.post("/users/new", async (req, res) => {
    var user = req.body

    try {
        await UserModel.create(user)
        return res.status(200).json({
            mensagem: "Usuário criado com sucesso",
            user: user
        })
    } catch (error) {
        console.log(`Erro ao criar novo usuário. Erro ${error}`)
        return res.status(500).json({error: error})
    }
})
module.exports = userController