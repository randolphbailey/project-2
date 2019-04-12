// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $(".submitPost").on("click", function() {
    var postID = $(this).attr("id");

    var bodyInput = $("#post-body");
    var postData = {
      body: bodyInput.val().trim(),
      postID: postID
    };

    console.log(postData);

    createComment(postData.body, postData.postID);
    //empty the fields
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createComment(body, postID) {
    $.post("/api/comment", {
      body: body,
      PostId: postID,
      UserId: 1
    }).then(function() {
      window.location.reload();
      // If there's an error, log the error
    });
  }
});
