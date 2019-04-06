// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $("#createpost").on("click", function() {
    var titleInput = $(".post-title");
    var bodyInput = $(".post-body");

    var postData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim()
    };

    console.log(postData);

    createPost(postData.title, postData.body);
    //empty the fields
    titleInput.val("");
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createPost(title, body) {
    $.post("/api/create", {
      title: title,
      body: body
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    });
  }
});
