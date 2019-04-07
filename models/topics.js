module.exports = function(sequelize, DataTypes) {
  var Topics = sequelize.define("Topics", {
    topicSubject: DataTypes.STRING,
    topicID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topicForum: DataTypes.INTEGER,
    topicBy: DataTypes.INTEGER
  });

  Topics.associate = function(models) {
    Topics.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };

  return Topics;
};
