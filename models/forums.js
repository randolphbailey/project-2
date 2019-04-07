module.exports = function(sequelize, DataTypes) {
  var Forums = sequelize.define("Forums", {
    forumID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    forumName: DataTypes.STRING,
    forumDescription: DataTypes.STRING
  });

  Forums.associate = function(models) {
    Forums.hasMany(models.Topics, {
      onDelete: "cascade"
    });
  };

  return Forums;
};
