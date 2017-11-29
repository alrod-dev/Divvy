// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - html-routing.js
// Date: 12/2/2017


module.exports = function getSites(app) {

    // Basic route that sends the user first to the AJAX Page

    //Index Page
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Index | Divvy',
            css: ['https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                '/assets/css/custom/landingPage.css', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
                'https://fonts.googleapis.com/css?family=Architects+Daughter|Roboto&subset=latin,devanagari'],
            icon: "http://res.cloudinary.com/alrod909/image/upload/v1511830743/divvy/divvyIcon.png",
            bodyName: 'welcome'
        });
    });

    //Login Page
    app.get('/login-page', function (req, res) {

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
    app.get('/user-register', function (req, res) {

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
    app.get('/users-lock', function (req, res) {

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
    app.get('/users-page', function (req, res) {
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
    app.get('/users-profile', function (req, res) {
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

};

