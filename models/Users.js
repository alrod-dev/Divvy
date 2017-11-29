// require mongoose and the database connection
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const UsersSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true
    },
    //  content is a required string
    text: {
        type: String,
        required: true
    },
    //  author is a required string
    author: {
        type: String,
        required: true
    },
    // // // link is a required string
    link: {
        type: String,
        required: true
    },
    //  image is a required string
    image: {
        type: String,
        required: true
    },
    genre:  {
        type: String,
        require: true
    }
});

// Create the Users model with the UsersSchema
var Users = mongoose.model("users", UsersSchema);

// Export the model
module.exports = Users;