// LOGIN
// When the form is submitted, we validate there's an username and password entered
$('#loginSubmit').on('click', function() {
	var usernameInput = $('.login-username');
	var passwordInput = $('.login-password');

	var userData = {
		username: usernameInput.val().trim(),
		password: passwordInput.val().trim()
	};

	if (!userData.username || !userData.password) {
		return;
	}

	// If we have an username and password we run the loginUser function and clear the form
	loginUser(userData.username, userData.password);
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(username, password) {
	$.post('/api/login', {
		username: username,
		password: password
	})
		.then(function() {
			window.location.href = `/index`;
			// If there's an error, log the error
		})
		.catch(handleLoginErr);
}

// Login error handling
function handleLoginErr(err) {
	var errMessage = 'something went wrong ¯\\_(ツ)_/¯';
	if (err.status === 401) {
		errMessage = 'username or password is incorrect';
	}
	$('#loginAlert .msg').text(errMessage);
	$('#loginAlert').fadeIn(500);
}

// REGISTER
// When the signup button is clicked, we validate the username and password are not blank
$('#registerSubmit').on('click', function() {
	var usernameInput = $('.register-username');
	var passwordInput = $('.register-password');

	var userData = {
		username: usernameInput.val().trim(),
		password: passwordInput.val().trim()
	};

	console.log(userData);

	if (!userData.username || !userData.password) {
		return;
	}
	// If we have an username and password, run the signUpUser function
	signUpUser(userData.username, userData.password);
});

// Does a post to the signup route. If successful, we are redirected to the members page
function signUpUser(username, password) {
	$.post('/api/signup', {
		username: username,
		password: password
	})
		.then(function() {
			window.location.href = `/index`;

			// If there's an error, handle it by throwing up a bootstrap alert
		})
		.catch(handleRegisterErr);
}

// Register error handling
function handleRegisterErr(err) {
	$('#registerAlert .msg').text(err.responseJSON);
	$('#registerAlert').fadeIn(500);
}

// Checks to see if the user is logged in
// If yes, display page as dictated. If not, display default
$.get('/api/isUserLoggedIn')
	.then(function(data) {
		if (data.response) {
			console.log('user is logged in');

			$('#createBtn').hide();
			$('#loginBtn').hide();
			$('#logoutBtn').show();
			$('#creatpostBtn').show();
			// $("#creatpostBtn").attr("byid", "username");
		}
	})
	.catch(function(err) {
		console.log(err);
	});
