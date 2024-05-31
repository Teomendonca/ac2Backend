const bcryptjs = require('bcryptjs')
const express = require('express')
const TodoModel = require('../../models/todo')
const auth = require("../../middlewares/authentication")

const todoController = express.Router()

todoController.get("/", auth, async (req, res) => {
    try {
        let todos = await TodoModel.find()
        return res.status(200).json(todos)
    } catch (error) {
        console.log(`Erro ao buscar TODOS. ${error}`);
        return res.status(500).json({ error: error })
    }
})

todoController.post("/new", auth, async (req, res) => {
    const { assigned, title, description, done } = req.body
    var todo = {
        assigned: assigned,
        title: title,
        description: description,
        done: done
    }

    try {
        await TodoModel.create(todo)
        res.status(201).json({
            mensagem: "Task criada com sucesso",
            todo: todo
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = todoController