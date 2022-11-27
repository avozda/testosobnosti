const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
   },
    R: {
        type: Number,
        required: true,
    },
    A: {
        type: Number,
        required: true,
    },
    I: {
        type: Number,
        required: true,
    },
    S: {
        type: Number,
        required: true,
    },
    E: {
        type: Number,
        required: true,
    },
    C: {
      type: Number,
      required: true,
  },
  date: {
   type: Date,
   default: Date.now
   },
   firstName:{
      type: String,
      required: true
  },
  field:{
      type: String,
      required: true
  },
  yearOfEntry:{
      type: String,
      required: true
  },
  lastName:{
      type: String,
      required: true
  }
});


module.exports = User = mongoose.model("Answer", AnswerSchema)