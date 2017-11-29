
let Users = require("../models/Users");

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