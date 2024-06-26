const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const TodoModel = require('../../models/todo')
const auth = require("../../middlewares/authentication")
const cookieParser = require('cookie-parser')

const todoController = express.Router()
todoController.use(auth)

todoController.get("/", auth, async (req, res) => {
    try {
        let todos = await TodoModel.find()
        return res.status(200).json(todos)
    } catch (error) {
        console.log(`Erro ao buscar TODOS. ${error}`);
        return res.status(500).json({ error: error })
    }
})

todoController.get("/unassigned", auth, async (req, res) => {
    try {
        let unassigned = await TodoModel.find({ assigned: 'null' });
        return res.status(200).json(unassigned)

    } catch (error) {
        console.log(`Erro ao buscar  sem responsaveis. ${error}`);
        return res.status(500).json({ error: error })
    }
})

todoController.put("/assign/:_id", auth, async (req, res) => {
    let todoid = req.params._id;
    let email = req.body.email;

    console.log(req.body);
    console.log(req.params);

    try {
        let todoAssign = await TodoModel.findOneAndUpdate(
            { _id: todoid },
            { $set: { assigned: email } },
            { new: true }
        );

        if (!todoAssign) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" })
        }

        return res.status(200).json(todoAssign)

    } catch (error) {
        console.log(`Erro ao buscar  sem responsaveis. ${error}`);
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

// My TODOS
todoController.get("/my-todo", auth, async (req, res) => {
    // const authHeader = req.headers.authorization
    // const [,token] = authHeader.split(' ')

    try {
        // const senha = process.env.JWT_SECRET
        // let user = jwt.verify(token, senha)
        let user = req.cookies.loggedUser
        let myTODO = await TodoModel.find({ assigned: user });

        console.log(user);
        return res.status(200).json(myTODO)

    } catch (error) {
        console.log(`Erro ao buscar my TODOS. ${error}`);
        return res.status(500).json({ error: error })
    }
})

//Edit my TODOS
todoController.put("/my-todo/edit/:_id", auth, async (req, res) => {
    let user = req.cookies.loggedUser
    let id = req.params._id
    try {
        let myTODO = await TodoModel.findOneAndUpdate(
            { _id: id, assigned: user },
            { $set: req.body },
            { new: true }
        );
        if (!myTODO) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" })
        }

        return res.status(200).json(myTODO)
    } catch (error) {
        console.log(`Erro ao editar TODOSdo usuário. ${error}`);
        return res.status(500).json({ error: error })
    }
})

//Delete my TODOS
todoController.delete("/my-todo/:_id", auth, async (req, res) => {
    let user = req.cookies.loggedUser
    let id = req.params._id
    try {
        let deleted = await TodoModel.findByIdAndDelete(
            { _id: id, assigned: user }
        )
        if (!deleted) {
            return res.status(404).json({ mensagem: "Tarefa não encontrada" })
        }
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(`Erro ao deletar TODOS do usuário. ${error}`);
        return res.status(500).json({ error: error })
    }
 })

module.exports = todoController