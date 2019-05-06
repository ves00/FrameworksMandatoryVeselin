const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let date = new Date().toLocaleString();

let question = new Schema({
        name: {
        type: String
    },
        title: {
        type: String
    },
        input: {
        type: String
    },
        created_date: {
        type : String,
        default : date
    }
});

module.exports = mongoose.model('question', question);