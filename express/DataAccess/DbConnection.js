const mongoose = require("mongoose");
require('dotenv').config()
const MONGO_URL = process.env.REACT_APP_MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;
  
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
  

  