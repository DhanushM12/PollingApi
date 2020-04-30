const express = require("express"); // using express
var bodyParser = require("body-parser"); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const app = express(); // calling express
const port = 8000; // setting port number to 8000
const db = require("./config/mongoose"); // mongoose configuration

//using middleware
app.use(express.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
//use express router
//app.use("/", require("./routes"));

//This app starts a server and listens on port 8000 for connections.
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`); //not connected
  }
  console.log(`Server is running on port: ${port}`); //connected successfully
});
