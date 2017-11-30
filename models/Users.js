// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - Users.js
// Date: 12/2/2017

// require mongoose and the database connection
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Create Schema class
const Schema = mongoose.Schema;

// Create user info schema
const UsersSchema = new Schema({
    // title is a required string
    fullname: {
        type: String,
        required: true
    },
    //  content is a required string
    address: {
        type: String,
        required: true
    },
    //  author is a required string
    phone: {
        type: String,
        required: true
    },
    // // // link is a required string
    vehicle: {
        type: String,
        required: true
    },
    //  image is a required string
    seats: {
        type: Number,
        required: true
    },
    email:  {
        type: String,
        require: true
    },
    username:  {
        type: String,
        require: true
    },
    password:  {
        type: String,
        require: true
    }
});

// Create the Users model with the UsersSchema
let Users = mongoose.model("users", UsersSchema);

// Export the model
module.exports = Users;

//Controller for creating userInfo
module.exports.createUser = function (newUser, callback) {

    //Encrypts the users password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });

};

//Looks for user by username
module.exports.getUserByUsername = function (username, callback) {

    let query = {username: username};
    Users.findOne(query, callback);

};

//Looks for user by Id
module.exports.getUserById = function (id, callback) {

    Users.findById(id, callback);

};

//Compare password if it's right or not
module.exports.comparePassword = function (candidatePassword, hash, callback) {

    // Load hash from your password DB.
    //Decrypts the users password from the DB
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;

        callback(null, isMatch);
    });

};