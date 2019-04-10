// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $(".submitPost").on("click", function() {
    var topicID = $(this).attr("id");

    var bodyInput = $("#post-body");
    var topicData = {
      body: bodyInput.val().trim(),
      topicID: topicID
    };

    console.log(topicData);

    createComment(topicData.body, topicData.topicID);
    //empty the fields
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createComment(body, topicID) {
    $.post("/api/comment", {
      body: body,
      topicID: topicID
    }).then(function() {
      window.location.reload();
      // If there's an error, log the error
    });
  }
});
