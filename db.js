const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://vishramgrah:1234@cluster0.wuxyg6t.mongodb.net/mern-rooms'


mongoose.connect(mongoURL)

var connection = mongoose.connection;

connection.on('error', () => {
    console.log("Mongo DB connection failed")
})

connection.on('connected', () => {
    console.log("Mongo DB connection Successful")
})

module.exports = mongoose