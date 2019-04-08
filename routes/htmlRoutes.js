// var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Forums.findAll({}).then(function(results) {
      res.render("index", {
        msg: "Welcome!",
        forums: results
      });
    });
  });

  //Load topics page given a forum name
  app.get("/f/:id", function(req, res) {
    db.Topics.findAll({ where: { ForumForumID: req.params.id } }).then(function(
      results
    ) {
      res.render("forum", {
        topics: results
      });
    });
  });

  //Load topics page given a forum name
  app.get("/t/:id", function(req, res) {
    db.Topics.findAll({ where: { TopicTopicID: req.params.id } }).then(function(
      results
    ) {
      res.render("topic", {
        posts: results
      });
    });
  });

  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/members.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
