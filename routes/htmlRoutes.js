var db = require("../models");

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

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    // eslint-disable-next-line prettier/prettier
    db.Posts.findOne({ where: { id: req.params.id } }).then(function(results) {
      res.render("example", {
        example: results
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
