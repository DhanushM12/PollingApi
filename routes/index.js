const express = require("express"); //fetch the existing instance

const router = express.Router(); //calling the Router

//for any other routes, access from here
router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

//exporting the router
module.exports = router;
