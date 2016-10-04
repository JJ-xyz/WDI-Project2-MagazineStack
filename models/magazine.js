//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var mongoose = require('mongoose');
var ArticleSchema = require('./article.js'); // embeded
var UserSchema = require('.user.js'); // embeded here
//*-----------------------------------------------------*
//* Define the schema constructor                       *
//*-----------------------------------------------------*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//*-----------------------------------------------------*
//* Create the schema objects                           *
//*-----------------------------------------------------*
var MagazineSchema = new Schema({
  magazinename: String,
  coverTitle: String,
  editionPeriod: String,
  editionVolume: Number,
  editionNumber: Number,
  articleList: [ArticleSchema],
  baseLocation: String,
  whereItIs: String,
  ownedBy: UserSchema,
  borrowBy: UserSchema,
  borrowDate: Date,
  returnedDate: Date,
});

//*-----------------------------------------------------*
//* Compile schema and create a model                   *
//*-----------------------------------------------------*
var MagazineModel = mongoose.model("Magazine", MagazineSchema);

//*-----------------------------------------------------*
//* export the module                                   *
//*-----------------------------------------------------*
module.exports = MagazineModel;
