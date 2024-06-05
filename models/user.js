const mongoose = require('mongoose')

const UserModel = mongoose.model('users', {
    nome: String,
    email: String,
    funcao: String,
    senha: String
})

module.exports = UserModel