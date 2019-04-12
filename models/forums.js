// Forum model
module.exports = function(sequelize, DataTypes) {
  var Forums = sequelize.define("Forums", {
    forumName: DataTypes.STRING,
    forumDescription: DataTypes.STRING
  });

  Forums.associate = function(models) {
    Forums.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };

  return Forums;
};
