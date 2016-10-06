//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var mongoose = require('mongoose');
//var MagazineSchema = require('./magazine.js'); // embeded here

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
  // page: Number,                       // for future use
  // scoreAverage: Number,               // for future use
  // Comments: [ { user: String,         // for future use
  //             score:                  // for future use
  //             { type: Number,         // for future use
  //               min: 1, max: 5 },     // for future use
  //             text: String } ],       // for future use
  // tags: [String]                      // for future use
});

//*-----------------------------------------------------*
//* Compile schema and create a model                   *
//*-----------------------------------------------------*
var ArticleModel = mongoose.model("Article", ArticleSchema);

//*-----------------------------------------------------*
//* export the module                                   *
//*-----------------------------------------------------*
module.exports = ArticleModel;
