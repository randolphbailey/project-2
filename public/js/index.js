// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// // LOGIN
// // When the form is submitted, we validate there's an username and password entered
// $("#loginSubmit").on("click", function() {
//   var usernameInput = $(".login-username");
//   var passwordInput = $(".login-password");

//   var userData = {
//     username: usernameInput.val().trim(),
//     password: passwordInput.val().trim()
//   };

//   if (!userData.username || !userData.password) {
//     return;
//   }

//   // If we have an username and password we run the loginUser function and clear the form
//   loginUser(userData.username, userData.password);
//   usernameInput.val("");
//   passwordInput.val("");
// });

// // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
// function loginUser(username, password) {
//   $.post("/api/login", {
//     username: username,
//     password: password
//   })
//     .then(function(data) {
//       window.location.replace(data);
//       // If there's an error, log the error
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }

// // REGISTER
// // When the signup button is clicked, we validate the username and password are not blank
// $("#registerSubmit").on("click", function() {
//   var usernameInput = $(".register-username");
//   var passwordInput = $(".register-password");

//   var userData = {
//     username: usernameInput.val().trim(),
//     password: passwordInput.val().trim()
//   };

//   console.log(userData);

//   if (!userData.username || !userData.password) {
//     return;
//   }
//   // If we have an username and password, run the signUpUser function
//   signUpUser(userData.username, userData.password);
//   usernameInput.val("");
//   passwordInput.val("");
// });

// // Does a post to the signup route. If successful, we are redirected to the members page
// function signUpUser(username, password) {
//   $.post("/api/signup", {
//     username: username,
//     password: password
//   })
//     .then(function(data) {
//       window.location.replace(data);
//       // If there's an error, handle it by throwing up a bootstrap alert
//     })
//     .catch(handleLoginErr);
// }

// function handleLoginErr(err) {
//   $("#alert .msg").text(err.responseJSON);
//   $("#alert").fadeIn(500);
// }
