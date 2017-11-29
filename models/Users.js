// require mongoose and the database connection
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
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