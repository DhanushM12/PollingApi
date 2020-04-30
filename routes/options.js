const express = require("express"); //fetch the existing instance

const router = express.Router(); //calling the Router

const optionsApi = require("../controllers/options_controller"); //getting the options controller

//to delete an option
router.post("/:id/delete", optionsApi.deleteOption);

//to increment the count of votes
router.post("/:id/add_vote", optionsApi.addVote);

//exporting the router
module.exports = router;
