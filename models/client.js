const mongoose = require('mongoose')

const ClientModel = mongoose.model('client', {
    nome: String
})

module.exports = ClientModel