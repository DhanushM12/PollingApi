const mongoose = require("mongoose"); // same instance of mongoose

//creating question schema with title and option fields
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//passing the questionSchema instance to mongoose.model
const Question = mongoose.model("Question", questionSchema);

//exporting the schema to be used further
module.exports = Question;
