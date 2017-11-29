// Author: Alfredo Rodriguez & Louie Lohebec
// File: JS - api-routing.js
// Date: 12/2/2017

// require packages needed for scraping data
var users = require('../models/Users');


module.exports = function (app, request) {

    /*
    / Users API
     */

    // Route for getting all Articles from the db
    app.get("/api/users", function (req, res) {
        // Grab every document in the Articles collection
        users
            .find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // DELETE route for deleting notes. You can access the note's id in req.params.id
    app.delete("/api/users/:id", function (req, res) {

        users.findByIdAndRemove({_id: req.params.id}, function (err, results) {
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            var response = {
                message: "Article successfully deleted",
                id: results._id
            };

            results.status(200).send(response);
        });

    });




};
