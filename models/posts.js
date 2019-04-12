// Post model
module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    postSubject: DataTypes.STRING,
    postBody: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Posts.associate = function(models) {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });
    Posts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Posts.belongsTo(models.Forums, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Posts;
};
