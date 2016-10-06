//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var mongoose      = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;  // Do I need this?

//*-----------------------------------------------------*
//* Define the schema constructor                       *
//*-----------------------------------------------------*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//*-----------------------------------------------------*
//* Create the schema objects                           *
//*-----------------------------------------------------*
var UserSchema = new Schema({
  username: String,
  password: String,
  favoriteBook: String,
  favoriteColor: String,
  postsQty: Number,
  banned: Boolean,
  admin: Boolean,
  createdAt: Date,
  updatedAt: Date
});
//*-----------------------------------------------------*
//* Add Passport related method to the schema           *
//*-----------------------------------------------------*
UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.sayHello = function() {
    console.log(this.username + " Logged");
};

//*-----------------------------------------------------*
//* Compile schema and create a model                   *
//*-----------------------------------------------------*
var UserModel = mongoose.model("User", UserSchema);

//*-----------------------------------------------------*
//* export the module                                   *
//*-----------------------------------------------------*
module.exports = UserModel;
