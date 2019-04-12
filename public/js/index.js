// Hide some elements
$("#logoutBtn").hide();
$("#creatpostBtn").hide();

// Populating all of the links with the names of the forums
$.get("/api/gettingForumTitles").then(function(data) {
  $("#forum-left").empty();
  $("#forum-dropdown").empty();
  $("#forum-createPost").empty();
  data.forEach(function(forumObj) {
    // Appending forum titles to the left nav bar
    var li = $("<li>");
    li.addClass("nav-item");
    li.attr("scope", "col");

    var a1 = $("<a>");
    a1.addClass("nav-link forumwhite");
    a1.attr("href", "/f/" + forumObj.id);
    a1.text(forumObj.forumName);

    li.append(a1);
    $("#forum-left").append(li);

    // Appending forum titles to the nav bar dropdown
    var a2 = $("<a>");
    a2.addClass("dropdown-item");
    a2.attr("href", "/f/" + forumObj.id);
    a2.text(forumObj.forumName);

    $("#forum-dropdown").append(a2);

    // Appending forum titles to the create post modal
    var opt = $("<option>");
    opt.val(forumObj.id);
    opt.text(forumObj.forumName);

    $("#forum-createPost").append(opt);
  });
});
