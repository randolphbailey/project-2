// Comment model
module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Comments.associate = function(models) {
    Comments.belongsTo(models.Posts);
    Comments.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comments;
};
