// create post
// When the create button is clicked,grab the input val
$(document).ready(function() {
  // $(".fas").on("click", function() {
  //   var id = $(this).attr("id");
  //   deleteTopic(id);
  // });
  $(".forum").on("click", function() {
    var forumid = $(this).attr("id");
    $("#createtopic").val(forumid);
  });
  $("#createtopic").on("click", function() {
    var titleInput = $("#topic-title");
    var bodyInput = $("#topic-body");
    var forumid = $("#createtopic").val();

    var topicData = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      forumID: forumid
    };

    console.log(topicData);
    $("#createtopic").val("");
    createTopic(topicData.title, topicData.body, topicData.forumID);
    //empty the fields
    titleInput.val("");
    bodyInput.val("");
  });

  // Does a post to the create route. If successful, we are redirected to the main page
  function createTopic(title, body, forumID) {
    $.post("/api/create", {
      title: title,
      body: body,
      forumID: forumID
    }).then(function() {
      window.location.reload();
    });
  }

  //This function does an API call to delete topics
  //   function deleteTopic(id) {
  //     $.ajax({
  //       method: "DELETE",
  //       url: "delete/" + id
  //     }).then(function() {
  //       window.location.reload();
  //     });
  //   }
});
