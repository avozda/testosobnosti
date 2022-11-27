const mongoose = require("mongoose");

//Model k uložení a prácí s uživateli v databázi

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    }

});


module.exports = User = mongoose.model("user", UserSchema)