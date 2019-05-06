const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors"); /* CORS is a node.js package for providing a Connect/Express middleware that can be used to */
const mongoose = require("mongoose");
const DbConnection = require("./DataAccess/DbConnection");
require('dotenv').config();
const PORT = (process.env.PORT || 4000);
const answerRoutes = express.Router();
const questionRoutes = express.Router(); /*we create an instance of the Express Router by adding this code*/
app.use(cors());

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));

let Question = require("./DataAccess/QuestionSchema.model");
let Answer = require("./DataAccess/AnswerSchema.model");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

/****** Helper functions *****/
//


/****** Routes *****/
app.get("/api/questions", (req, res) => {
  Question.find((err, questions) => {
    res.json(questions);
  });
});

app.get("/api/questions/:id", (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    res.json(question);
  });
});

app.post("/api/questions/add", (req, res) => {
  let question = new Question(req.body);
  question.save().then(question => {
    if (err) {
      res.status(400).send("adding new question failed");
    }
    res.json(question);
  });
});

app.put("/api/questions/:id", (req, res) => {
  res.json(getQuestionFromId(req.params.id));
});



app.get("/api/answers", (req, res) => {
  Answer.find((err, answers) => {
    res.json(answers);
  });
});

app.get("/api/answers/:id", (req, res) => {
  Answer.findById(req.params.id, (err, answer) => {
    res.json(answer);
  });
});

app.get("/api/questions/:id/answers", (req, res) => {
  Answer.find((err, answers) => {
    res.json(answers);
  });
});

app.put('/api/answers/:id', (req, res) => {
  Answer.findOneAndUpdate({ _id: req.body.answer_id }, req.body, { new: true })
    .then(function(vote) {
      res.send(vote);
    })
    .then(console.log(`Vote is on`))
    .catch(err => console.log(err));
});

app.post("/api/answers/add", (req, res) => {
  let answer = new Answer(req.body);
  answer.save().then(answer => {
    if (err) {
      res.status(400).send("adding new answer failed");
    }
    res.json(answer);
  });
});

app.use(
  "/questions",
  questionRoutes,
  answerRoutes
); 

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
