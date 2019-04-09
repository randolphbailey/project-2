var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // ---------- Beginning Passport ----------
  // If the user has valid login credentials, send them to the members page
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.send(true);
  });

  // Route for checking to see if a user is logged in
  app.get("/api/isUserLoggedIn", function(req, res) {
    if (req.user) {
      return res.json({ response: true });
    }
    res.json({ response: false });
  });

  // Route for signing up a user. The user's password is automatically hashed with bcrypt since we set that up in the User Modal
  app.post("/api/signup", function(req, res) {
    console.log("signup");
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.send(200);
      })
      .catch(function(err) {
        console.log(err);
        res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging out user
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for creating a post.
  app.post("/api/create", function(req, res) {
    db.Topics.create({
      topicSubject: req.body.title,
      topicBody: req.body.body
    })
      .then(function() {
        res.send(200);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
  // ---------- End Passport ----------

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Posts.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Posts.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Posts.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
