// var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Topics.findAll({}).then(function(results) {
      res.render("index", {
        msg: "Welcome!",
        forums: results
      });
    });
  });

  // Load posts and sort them by newest
  app.get("/byTimeAsc", function(req, res) {
    db.Topics.findAll({
      limit: 10,
      order: [["updatedAt", "ASC"]]
    }).then(function(results) {
      console.log(results);
      res.render("index", {
        msg: "Welcome!",
        forums: results
      });
    });
  });

  // Load posts and sort them by oldest
  app.get("/byTimeDesc", function(req, res) {
    db.Topics.findAll({
      limit: 10,
      order: [["updatedAt", "DESC"]]
    }).then(function(results) {
      console.log(results);
      res.render("index", {
        msg: "Welcome!",
        forums: results
      });
    });
  });

  // route for deleting a specific topic
  app.delete("delete/:id", function(req, res) {
    console.log(req.params.id);
    db.Topics.destroy({ where: { topicID: req.params.id } }).then(function(
      results
    ) {
      console.log(results);
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
      console.log(results);
      res.render("index", {
        msg: "Welcome!",
        forums: results
      });
    });
  });
  // delete selected topic
  // app.delete("delete/:id", function(req, res) {
  //   db.Topics.destroy({ where: { topicID: req.params.id } }).then(function(
  //     results
  //   ) {
  //     console.log(results);
  //     res.render("index", {
  //       msg: "Welcome!",
  //       forums: results
  //     });
  //   });
  // });

  // Load topics page given a forum name
  app.get("/t/:id", function(req, res) {
    db.Topics.findAll({ where: { TopicTopicID: req.params.id } }).then(function(
      results
    ) {
      res.render("topic", {
        posts: results
      });
    });
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
