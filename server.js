// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - server.js
// Date: 12/2/2017

// Dependencies
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let path = require("path");
let cookieParser = require("cookie-parser");

//Authentication Package
let session = require("express-session");
let passport = require("passport");

let PORT = 6969;

// Initialize Express
let app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Handlebars.
let exphbs = require("express-handlebars");

app.use(cookieParser());

// Static file support with public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'honey boo boo',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
}));

//Starts User Session when logged in
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routing initiated
require("./routes/html-routing")(app);
require("./routes/api-routing")(app);

require("./config/connection");

// requiring the news and notes models
require('./models/Users');


// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
