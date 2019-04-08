module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    postBody: DataTypes.TEXT,
    postID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    postedBy: DataTypes.INTEGER,
    postTopic: DataTypes.STRING
  });

  Posts.associate = function(models) {
    Posts.belongsTo(models.Topics);
  };

  return Posts;
};
