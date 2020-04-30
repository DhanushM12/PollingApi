//require the library
const mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb://localhost:27017/polling_db");

//acquire the connection to check if it is successful or not
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

//up and running then print the msg
db.once("open", function () {
  console.log("Successfully connected to MongoDB database");
});

module.exports = db;
