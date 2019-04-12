// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $(".submit-comment").on("click", function() {
    var postID = $(this).attr("data-id");

    var bodyInput = $(".comment-body[data-id=" + postID + "]");
    var commentData = {
      commentBody: bodyInput.val().trim(),
      PostId: postID
    };

    console.log(commentData);

    createComment(commentData);
    //empty the fields
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createComment(commentData) {
    $.post("/api/comment", commentData).then(function() {
      window.location.reload();
      // If there's an error, log the error
    });
  }

  // Delete comment
  $(".delete-comment").on("click", function() {
    $.get("/api/comment/delete/" + $(this).attr("data-id")).then(function() {
      window.location.reload();
    });
  });
});
