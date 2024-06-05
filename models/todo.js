const mongoose = require('mongoose')

const TodoModel = mongoose.model('todo', {
    assigned: String,
    title: String,
    description: String,
    done: Boolean,

})
module.exports = TodoModel