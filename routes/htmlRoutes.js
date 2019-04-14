// var path = require("path");
var db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/isAuthenticated');

module.exports = function(app) {
	// Load landing page
	app.get('/', function(req, res) {
		db.Posts.findAll({}).then(function(results) {
			res.render('login', {
				forums: results
			});
		});
	});
	// Load index page
	app.get('/index', function(req, res) {
		db.Posts.findAll({}).then(function(results) {
			res.render('index', {
				forums: results
			});
		});
	});

	// Load posts and sort them by newest
	app.get('/byTimeAsc', function(req, res) {
		db.Posts
			.findAll({
				limit: 10,
				order: [ [ 'updatedAt', 'ASC' ] ]
			})
			.then(function(results) {
				console.log(results);
				res.render('index', {
					forums: results
				});
			});
	});

	// Load posts and sort them by oldest
	app.get('/byTimeDesc', function(req, res) {
		db.Posts
			.findAll({
				limit: 10,
				order: [ [ 'updatedAt', 'DESC' ] ]
			})
			.then(function(results) {
				console.log(results);
				res.render('index', {
					forums: results
				});
			});
	});

	// route for deleting a specific post
	app.get('/delete/:id', function(req, res) {
		db.Posts.destroy({ where: { id: req.params.id } }).then(function(results) {
			console.log(results);
			res.render('index', {
				forums: results
			});
		});
	});

	//Load posts page given a forum name
	app.get('/f/:id', function(req, res) {
		db.Posts.findAll({ where: { id: req.params.id } }).then(function(results) {
			console.log(results);
			res.render('index', {
				forums: results
			});
		});
	});

	//Load comments given post id
	app.get('/p/:id', function(req, res) {
		db.Comments.findAll({ where: { PostId: req.params.id } }).then(function(results) {
			console.log(results);
			res.render('comments', {
				comments: results
			});
		});
	});

	// If a user who is not logged in tries to access this route they will be redirected to the signup page
	app.get('/members', isAuthenticated, function(req, res) {
		res.sendFile(path.join(__dirname, '../public/html/members.html'));
	});

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404');
	});
};
