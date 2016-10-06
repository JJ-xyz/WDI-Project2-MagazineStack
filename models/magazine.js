//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var mongoose = require('mongoose');
var ArticleSchema = require('./article.js').schema; // embeded
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
  // whereItIs: String,                // For future use
  // ownedBy: String,                  // For future use
  // borrowBy: String,                 // For future use
  // borrowDate: Date,                 // for future use
  // returnedDate: Date,               // for future use
});

//*-----------------------------------------------------*
//* Compile schema and create a model                   *
//*-----------------------------------------------------*
var MagazineModel = mongoose.model("Magazine", MagazineSchema);

//*-----------------------------------------------------*
//* export the module                                   *
//*-----------------------------------------------------*
module.exports = MagazineModel;
