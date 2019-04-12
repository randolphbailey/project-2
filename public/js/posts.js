// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  $(".forum").on("click", function() {
    var forumid = $(this).attr("id");
    $("#createpost").val(forumid);
  });
  $("#createpost").on("click", function() {
    var titleInput = $("#post-title");
    var bodyInput = $("#postBody");
    var forumid = $("#forum-createPost").val();
    // var postedby = $("#createpost").attr("byid");

    var postData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      forumId: forumid
    };

    console.log(postData);
    $("#createpost").val("");
    createPost(postData.title, postData.body, postData.forumId);
    //empty the fields
    titleInput.val("");
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createPost(title, body, forumId) {
    $.post("/api/create", {
      title: title,
      body: body,
      id: forumId
    }).then(function() {
      window.location.reload();
    });
  }
});
