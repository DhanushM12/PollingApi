const Question = require("../models/question");
const Option = require("../models/option");

//to create a question
module.exports.create = async function (req, res) {
  try {
    let question = await Question.create({
      question: req.body.question,
      options: req.body.options,
    });

    if (question) {
      return res.json(200, {
        message: "Question created successfully",
        question,
      });
    } else {
      return res.json(421, {
        message: "Error in creation of question",
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

//to display a question with all its options
module.exports.getQuestion = async function (req, res) {
  let question = await Question.findById(req.params.id).populate("options");
  if (question) {
    let options = question.options;
    let arrayOption = [];
    for (let option of options) {
      arrayOption.push({
        option: option.option,
        vote: option.vote,
        link_to_vote: option.link_to_vote,
      });
    }
    return res.json(200, {
      message: "The question is : ",
      question: {
        question: question.question,
        options: arrayOption,
      },
    });
  } else {
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

//to add a new option for a specific question
module.exports.addOptions = async function (req, res) {
  try {
    console.log(req.params.id);
    let question = await Question.findById(req.params.id);
    if (question) {
      let option = await Option.create({
        option: req.body.option,
        question: req.params.id,
        vote: 0,
        link_to_vote: " ",
      });

      option.link_to_vote =
        req.protocol +
        "://" +
        req.headers.host +
        "/api/options" +
        "/" +
        option.id +
        "/add_vote";
      option.save();
      question.options.push(option);
      question.save();
      return res.json(200, {
        message: "Successfully added a option",
        option: {
          option: option.option,
          link_to_vote: option.link_to_vote,
        },
      });
    } else {
      return res.json(421, {
        message: "Error Invalid question",
      });
    }
  } catch (err) {
    console.log("Error " + err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

//to delete a question and all its options
module.exports.deleteQuestion = async function (req, res) {
  try {
    let question = await Question.findById(req.params.id);
    if (question) {
      let options = question.options;
      for (let i = 0; i < options.length; i++) {
        let option = await Option.findById(options[i]);
        //question with option having greater than 0 vote cannot be deleted
        if (option && option.vote > 0) {
          return res.json(403, {
            message:
              "This question can't be deleted due to atleast 1 vote present in option",
          });
        }
      }

      question.remove();

      await Option.deleteMany({ question: req.params.id });

      return res.json(200, {
        message: "Question and its options are deleted successfully",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
