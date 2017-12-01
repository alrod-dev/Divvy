// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - api-routing.js
// Date: 12/2/2017

/*
/ Global Variables
 */
let express = require("express");
let router = express.Router();

// require packages needed for scraping data;
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

let User = require('../models/Users');

/*
/ Users API
 */

// Route for getting all users from the db
router.get("/allUsers", function (req, res) {
    // Grab every document in the Articles collection
    User
        .find({})
        .then(function (userDB) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(userDB);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// DELETE route for deleting notes. You can access the note's id in req.params.id
router.delete("/:id", function (req, res) {

    User.findByIdAndRemove({_id: req.params._id}, function (err, results) {
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        let response = {
            message: "User successfully deleted",
            id: results._id
        };

        results.status(200).send(response);
    });

});

//Update the users info
router.post("/update", function (req, res) {
    const userUpdated = {
        fullname: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        vehicle: req.body.vehicle,
        seats: req.body.seats,
        email: req.body.email
    };

    console.log(userUpdated);

    console.log(req.body._id);


    User.findOneAndUpdate({_id: req.body._id}, userUpdated,

        function (err, raw) {
            if (err) {
                res.send(err);
            }

            return res.redirect('/users-profile');

        }
    );


});

//Router
router.post("/re-logged", function (req, res) {

    let password = req.body.password;
    let actualPassword;

    console.log(password);

    console.log(req.body.id);

    User.getUserById(req.body.id,

        function (err, isMatch) {
            if (err) {
                res.send(err);
            }

            console.log(isMatch.password);

            actualPassword = isMatch.password;


            User.comparePassword(password, actualPassword, function (err, isMatch) {

                if(err) throw err;

                if(!isMatch)
                {
                    req.flash("error_msg", "Invalid Password");
                }

                res.redirect('/users-page');


            });

        }
    );




});


// Route for register new user to the db
router.post("/register", function (req, res) {

    let fullname = req.body;

    console.log(fullname);


    const userInfo = {

        fullname: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        vehicle: req.body.vehicle,
        seats: req.body.seats,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password

    };

    console.log(userInfo);

    //Check if all fields have been validated
    req.checkBody("name", "Name is required").notEmpty();
    req.checkBody("address", "Address is required").notEmpty();
    req.checkBody("phone", "Phone number is required").notEmpty();
    req.checkBody("phone", "Phone number is not valid").matches(/^\+?(\d.*){3,}$/, "i");
    req.checkBody("vehicle", "Vehicle is required").notEmpty();
    req.checkBody("seats", "Seats is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("username", "Username can only have letters or numbers").matches(/^[a-zA-Z0-9]*$/, "i");
    req.checkBody("username", "Username can only be 4 to 16 letters").len(4, 16);
    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password", "Password must include at least one upper case letter, " +
        "one lower case letter, and one numeric digit.").matches(/^[a-zA-Z]\w{3,14}$/, "i");
    req.checkBody("password", "Password must be 6-18 characters long").len(6, 18);

    //
    let errors = req.validationErrors();

    if (errors) {

        res.render('registerUser', {
            title: 'Register User | Divvy',
            css: ['/assets/css/themes/semi-dark-menu/materialize.css',
                '/assets/css/themes/semi-dark-menu/style.css',
                '/assets/css/custom/loginPage.css',
                '/assets/css/layouts/page-center.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png",
            errors: errors
        });

    } else {

        const newUser = new User({

            fullname: userInfo.fullname,
            address: userInfo.address,
            phone: userInfo.phone,
            vehicle: userInfo.vehicle,
            seats: userInfo.seats,
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password

        });

        User.createUser(newUser, function (err, user) {

            if (err) throw err;

            console.log(user);

            req.flash('success_msg', "Thanks for registering " + userInfo.fullname + ", now you can log in");

            setTimeout(function () {
                res.redirect('/login-page')
            }, 2000);

        });


    }

});

//Authenticator for log-in
passport.use(new LocalStrategy(
    function (username, password, done) {

        User.getUserByUsername(username, function (err, user) {

            if (err) throw err;

            if (!user) {
                return done(null, false, {message: 'Unknown User'})
            }

            User.comparePassword(password, user.password, function (err, isMatch) {

                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                }

                else {
                    return done(null, false, {message: 'Invalid Password'})
                }

            })

        })

    }
));

/*
/ Serializes and De-Serializes user info
 */
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

/*
/ Logs in user
 */
router.post('/login', passport.authenticate('local',
    {successRedirect: '/users-page', failureRedirect: '/login-page', failureFlash: true}),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.

        res.redirect('/users-page');
    });

/*
/ Logs out user
 */

router.get('/logout', function (req, res) {

    req.logOut();

    req.flash("success_msg", "Log Out Successful!");

    res.redirect("/login-page");
});


module.exports = router;

