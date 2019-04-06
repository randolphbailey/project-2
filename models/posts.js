module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserID: DataTypes.INTEGER,
    topicID: DataTypes.INTEGER,
    postedBy: DataTypes.STRING
  });
  return Posts;
};
