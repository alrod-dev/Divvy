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
let expressValidator = require("express-validator");
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let flash = require("connect-flash");

// Set Handlebars.
let exphbs = require("express-handlebars");

// Initialize Express
let app = express();

//Routing initiated
let routes = require("./routes/html-routing");
let users = require("./routes/api-routing");

//Mongoose Connection
require("./config/connection");

// requiring the news and notes models
require('./models/Users');

let PORT = 6969;



//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// BodyParser Middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Static file support with public folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'honey boo boo',
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
}));

//Starts User Session when logged in
app.use(passport.initialize());
app.use(passport.session());


app.use(expressValidator({
    errorFormatter: function (param, msg, value) {

        let namespace = param.split('.'),

            root = namespace.shift(),

            formParam = root;

        while (namespace.length)
        {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg : msg,
            value: value
        };

    }
}));

//Flash text
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Set routes
app.use('/', routes);
app.use('/users', users);

//Set the port
app.set('port', (process.env.PORT || PORT));


// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});
