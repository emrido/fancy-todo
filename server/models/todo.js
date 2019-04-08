const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Title required']
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    due_date: Date,
    status: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;