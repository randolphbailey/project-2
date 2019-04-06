var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Posts.findAll({}).then(function(results) {
      res.render("index", {
        msg: "Welcome!",
        posts: results
      });
    });
  });

  app.get("/api/create", function(req, res) {
    db.Posts.findAll({}).then(function(results) {
      res.render("index", {
        msg: "Welcome!",
        posts: results
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Posts.findOne({ where: { id: req.params.id } }).then(function(results) {
      res.render("example", {
        example: results
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/login", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    res.render("login", {});
  });

  // Login
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
