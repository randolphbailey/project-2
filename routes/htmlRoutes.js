// var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Posts.findAll({ include: [db.Comments] }).then(function(results) {
      res.render("index", {
        posts: results
      });
    });
  });

  // Load posts and sort them by newest
  app.get("/byTimeAsc", function(req, res) {
    db.Posts.findAll({
      limit: 10,
      order: [["updatedAt", "ASC"]]
    }).then(function(results) {
      console.log(results);
      res.render("index", {
        posts: results
      });
    });
  });

  // Load posts and sort them by oldest
  app.get("/byTimeDesc", function(req, res) {
    db.Posts.findAll({
      limit: 10,
      order: [["updatedAt", "DESC"]]
    }).then(function(results) {
      console.log(results);
      res.render("index", {
        posts: results
      });
    });
  });

  //Load posts page given a forum name
  app.get("/f/:id", function(req, res) {
    db.Posts.findAll({
      where: { ForumId: req.params.id },
      include: [db.Comments]
    }).then(function(results) {
      console.log(results);
      var hbsObject = {
        posts: results
      };

      // for loop to keep track of what Post we're looking at
      for (i = 0; i < results.length; i++) {
        if (req.user && req.user.id === results[i].UserId) {
          results[i].displayDelete = true;
        }
        // for loop to go through the Comments of that Post
        for (j = 0; j < results[i].Comments.length; j++) {
          // check to see if req.user.id === results[i].Comments[j].UserId
          // if it is, make a new property in that Comments object, displayDelete = true
          if (req.user && req.user.id === results[i].Comments[j].UserId) {
            results[i].Comments[j].displayDelete = true;
          }
        }
      }

      res.render("index", hbsObject);
    });
  });

  //Load comments given post id
  app.get("/p/:id", function(req, res) {
    db.Comments.findAll({ where: { PostId: req.params.id } }).then(function(
      results
    ) {
      console.log(results);
      res.render("comments", {
        comments: results
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
