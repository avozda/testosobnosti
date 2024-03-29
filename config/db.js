//Připojení k databázi
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");


const connectDB = async() => {
    try {
        var connection = await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
      
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDB;