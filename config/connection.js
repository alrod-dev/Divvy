// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - connection.js
// Date: 12/2/2017


// require mongoose
let mongoose = require('mongoose');

// Set mongoose to leverage JavaScript ES6 Promises
mongoose.Promise = Promise;

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/divvy";

// Database configuration with mongoose
mongoose.connect(MONGODB_URI, {useMongoClient: true});

let db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
    console.log("Mongoose connection successful.");
});


// export the database, making it available throughout the application
module.exports = db;