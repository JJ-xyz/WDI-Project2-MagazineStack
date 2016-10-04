//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var mongoose = require('mongoose');
var UserSchema = require('./user.js'); // embeded here

//*-----------------------------------------------------*
//* Define the schema constructor                       *
//*-----------------------------------------------------*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//*-----------------------------------------------------*
//* Create the schema objects                           *
//*-----------------------------------------------------*
var ArticleSchema = new Schema({
  title: String,
  author: String,
  topic: String,
  abstract: String,
  page: Date,
  scoreAverage: Number,
  Comments: { user: UserSchema,
              score: { type: Number, min: 1, max: 5 },
              text: String },
  tags: [String]
});

//*-----------------------------------------------------*
//* Compile schema and create a model                   *
//*-----------------------------------------------------*
var ArticleModel = mongoose.model("Article", ArticleSchema);

//*-----------------------------------------------------*
//* export the module                                   *
//*-----------------------------------------------------*
module.exports = ArticleModel;
