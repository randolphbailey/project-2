// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $("#createtopic").on("click", function() {
    var titleInput = $("#topic-title");
    var bodyInput = $("#topic-body");

    var topicData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim()
    };

    console.log(topicData);

    createTopic(topicData.title, topicData.body);
    //empty the fields
    titleInput.val("");
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createTopic(title, body) {
    $.post("/api/create", {
      title: title,
      body: body
    }).then(function() {
      window.location.reload();
      // If there's an error, log the error
    });
  }
});
