const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    } 
});


module.exports = User = mongoose.model("Question", QuestionSchema)