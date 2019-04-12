// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
var bcrypt = require("bcrypt-nodejs");

// User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The username cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Posts, {
      onDelete: "cascade"
    });
    User.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model
  // This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // This hook says that before a User is created, automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
