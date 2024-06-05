const ClientModel = require("../models/client")
const express = require('express')
const auth = require("../middlewares/authentication")

const clientController = express.Router()

clientController.get("/", auth, async (req, res) => {
    try{
        let client = await ClientModel.find()
        return res.status(200).json(client)

    } catch(err){
        console.log(`Erro ao buscar clients ${err}`);
        return res.status(500).json({error: err})
    }
})

clientController.post("/new", async (req, res) => {
    var client = req.body
    try {
        await ClientModel.create(client)
        return res.status(200).json({
            mensagem: "Cliente criado com sucesso",
            client: client
        })
    } catch (error) {
        console.log(`Erro na criação de Cliente. Erro ${error}`)
        return res.status(500).json({ error: error })
    }

})


module.exports = clientController