module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: DataTypes.TEXT,
    UserID: DataTypes.INTEGER,
    PostID: DataTypes.INTEGER
  });
  return Comment;
};
