
let Users = require("../models/Users");

module.exports.createUser = function (newUser, callback) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });

};

module.exports.getUserByUsername = function (username, callback) {

    let query = {username: username};
    Users.findOne(query, callback);

};

module.exports.comparePassword = function (username, callback) {

    let query = {username: username};
    Users.findOne(query, callback);

};