const express = require("express"); //fetch the existing instance

const router = express.Router(); //calling the Router

const questionApi = require("../controllers/questions_controller"); //getting the questions controller

//to add a question
router.post("/create", questionApi.create);

//to display a question with all its options
router.get("/:id", questionApi.getQuestion);

//to add a new option for a specific question
router.post("/:id/options/create", questionApi.addOptions);

//to delete a question and all its options
router.post("/:id/delete", questionApi.deleteQuestion);

//exporting the router
module.exports = router;
