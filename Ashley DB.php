Forums
 - title
 - description
 - hasMany Posts

Posts
 - title
 - body
 - belongsTo Forums
 - hasOne Users
 - hasMany Comments

Comments
 - body
 - belongsTo Posts
 - hasOne Users

Users
 - username
 - password
 - belongsToMany Posts
 - belongsToMany Comments