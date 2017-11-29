// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - html-routing.js
// Date: 12/2/2017


let express = require("express");
let router = express.Router();


    // Basic route that sends the user first to the AJAX Page

    //Index Page
    router.get('/', function (req, res) {
        res.render('index', {
            title: 'Index | Divvy',
            css: ['https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                '/assets/css/custom/landingPage.css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
                'https://fonts.googleapis.com/css?family=Architects+Daughter|Roboto&subset=latin,devanagari'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png",
            //Sets welcome class to body
            bodyName: 'welcome'
        });
    });

    //Login Page
    router.get('/login-page', function (req, res) {

        res.render('loginPage', {
            title: 'Login Page | Divvy',
            css: ['/assets/css/themes/semi-dark-menu/materialize.css',
                '/assets/css/themes/semi-dark-menu/style.css',
                '/assets/css/custom/loginPage.css',
                '/assets/css/layouts/page-center.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png"
        });
    });

    //User Registration Page
    router.get('/user-register', function (req, res) {

        res.render('registerUser', {
            title: 'Register User | Divvy',
            css: ['/assets/css/themes/semi-dark-menu/materialize.css',
                '/assets/css/themes/semi-dark-menu/style.css',
                '/assets/css/custom/loginPage.css',
                '/assets/css/layouts/page-center.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png"
        });
    });

    //Locked User Page
    router.get('/users-lock', ensureAuthenticated, function (req, res) {

        res.render('userLock', {
            title: 'User Lock | Divvy',
            css: ['/assets/css/themes/semi-dark-menu/materialize.css',
                '/assets/css/themes/semi-dark-menu/style.css',
                '/assets/css/custom/loginPage.css',
                '/assets/css/layouts/page-center.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png"
        });
    });

    //Main User Page
    router.get('/users-page', ensureAuthenticated, function (req, res) {
        res.render('userPage', {
            title: 'User Page | Divvy',
            css: ['/assets/css/themes/fixed-menu/materialize.css',
                '/assets/css/themes/fixed-menu/style.css',
                '/assets/css/custom/userPage.css',
                '/assets/css/plugins/media-hover-effects.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css',
            '/assets/vendors/magnific-popup/magnific-popup.css', '/assets/vendors/flag-icon/css/flag-icon.min.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png"
        });
    });

    //User Profile Page
    router.get('/users-profile', ensureAuthenticated, function (req, res) {
        res.render('profile', {
            title: 'User Profile | Divvy',
            css: ['/assets/css/themes/fixed-menu/materialize.css',
                '/assets/css/themes/fixed-menu/style.css',
                '/assets/css/custom/userPage.css',
                '/assets/css/plugins/media-hover-effects.css', '/assets/vendors/perfect-scrollbar/perfect-scrollbar.css',
                '/assets/vendors/magnific-popup/magnific-popup.css', '/assets/vendors/flag-icon/css/flag-icon.min.css'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png"
        });
    });

    function ensureAuthenticated(req, res, next) {

        if(req.isAuthenticated())
        {
            return next();
        }

        else
        {
            req.flash('error_msg', "You're not logged in");
            res.redirect("/login-page")
        }
        
    }

module.exports = router;

