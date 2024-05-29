const ClientModel = require("../models/client")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')

//Não autenticada 

const clientController = express.Router()

clientController.post("/client", async (req, res) => {
    var client = req.body
    try {
        await ClientModel.create(client)
        return res.status(200).json({
            mensagem: "Cliente criado com sucesso",
            client: client
        })
    } catch (error) {
        console.log(`Erro na criação de Cliente. Erro ${error}`)
        return res.status(500).json({error: error})
    }

})

module.exports = clientController