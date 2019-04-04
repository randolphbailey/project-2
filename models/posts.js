module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    topic: DataTypes.STRING,
    body: DataTypes.TEXT,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topicID: DataTypes.INTEGER
  });
  return Posts;
};
