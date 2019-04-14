require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var helmet = require("helmet");
var session = require("express-session");
var passport = require("./config/passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
// Helmet sets up a few security conciouse HTTP headers, and is recommended by express.
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Use sessions to keep track of our user's login status
app.use(
  session({
    secret: "forums are super cool",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.get('/', (req,res) => res.render("login", {layout:'landingpage'}));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//testing parameters
var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions = { force: true };
}

// Starting the server, syncing our models and adding in the forums
var forumNamesArr = [
  { name: "Movies", description: "Movies" },
  { name: "TV Show", description: "TV Show" },
  { name: "Food", description: "Food" },
  { name: "Hobbies", description: "Hobbies" },
  { name: "Outdoors", description: "Outdoors" },
  { name: "Gaming", description: "Gaming" }
];

db.sequelize.sync(syncOptions).then(function() {
  createForumRows(0);
});

function createForumRows(i) {
  db.Forums.create({
    forumName: forumNamesArr[i].name,
    forumDescription: forumNamesArr[i].description
  }).then(function() {
    i++;
    if (i < 6) {
      createForumRows(i);
    } else {
      db.Forums.destroy({
        where: {
          id: {
            $gt: 6
          }
        }
      }).then(function() {
        app.listen(PORT, function() {
          console.log(
            "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
          );
        });
      });
    }
  });
}

module.exports = app;
