const bcryptjs = require('bcryptjs')
const express = require('express')
const UserModel = require("../../models/user")
const auth = require("../../middlewares/authentication")

const userController = express.Router()

userController.get("/", auth, async (req, res) => {
    try {
        let users = await UserModel.find()
        return res.status(200).json(users)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({ error: err })
    }
})

userController.get("/count", auth, async (req, res) => {
    try {
        let countU = await UserModel.aggregate([
            {
                $group: {
                    _id: '$funcao',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(201).json(countU);
    } catch (error) {
        res.status(500).json({error: error})
    }
})

userController.get("/:_id", auth, async (req, res) => {
    var id = req.params._id

    try {
        let user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" })
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({ error: err })
    }
})

userController.delete("/:_id", auth, async (req, res) => {
    var id = req.params._id

    try {
        // let user = await UserModel.findById(id)
        // let dUser = await UserModel.deleteOne(user);
        let dUser = await UserModel.findByIdAndDelete({_id: id});
        if (!dUser) {
            return res.status(404).json({ mensagem: "Usuário não encontrada" })
        }
        res.status(200).json({
            mensagem: "usuário deletado",
            dUser: dUser
        })

    } catch (error) {
        console.log(`Um erro ocorreu ao deletar usuários. ${error}`)
        return res.status(500).json({ error: error })
    }

})

userController.put("/edit/:_id", auth, async (req, res) => {
    var id = req.params._id
    try {
        let user = await UserModel.findById(id)
        let data = await UserModel.updateOne(
            user,
            { $set: req.body }
        )
        res.status(200).json({
            mensagem: "usuário editado",
            data: data
        })

    } catch (error) {
        console.log(`Um erro ocorreu ao editar usuários. ${error}`)
        return res.status(500).json({ error: error })
    }
})

userController.post("/new", auth, async (req, res) => {
    const { nome, email, funcao, senha } = req.body
    const senhaEncrypt = await bcryptjs.hash(senha, 10)
    var user = {
        nome: nome,
        email: email,
        funcao: funcao,
        senha: senhaEncrypt
    }

    try {
        await UserModel.create(user)
        res.status(201).json({
            mensagem: "Usuário criado com sucesso!",
            user: user
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = userController

