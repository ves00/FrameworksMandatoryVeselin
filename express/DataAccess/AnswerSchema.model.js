const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let date = new Date().toLocaleDateString();

let answer = new Schema({
  name: {
    type: String
  },
  input: {
    type: String
  },
  replyTo: {
    type: String
  },
  votes: {
    type: Number
  },
  created_date: {
    type: String,
    default: date
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question"
  }
});

module.exports = mongoose.model("answer", answer);
