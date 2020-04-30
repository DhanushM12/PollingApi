const Question = require("../models/question");
const Option = require("../models/option");

//to delete an option
module.exports.deleteOption = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    if (option) {
      let questionId = option.question;
      //option having greater than 0 vote can't be deleted
      if (option.vote > 0) {
        return res.json(403, {
          message: "Cannot delete this option due to votes greater than 0",
        });
      }

      option.remove();

      let question = Question.findByIdAndUpdate(questionId, {
        $pull: { options: req.params.id },
      });

      return res.json(200, {
        message: "option deleted successfully",
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

//to increment the count of votes
module.exports.addVote = async function (req, res) {
  try {
    let option = await Option.findById(req.params.id);
    if (option) {
      option.vote += 1; //increment by 1
      option.save();
      return res.json(200, {
        message: "The vote is added to the question ",
        option: option,
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.json(500, {
      message: "Internal server error ",
    });
  }
};
