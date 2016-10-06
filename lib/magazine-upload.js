//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
// =============== Load Modules =======================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/magazine');
mongoose.Promise = global.Promise;
// =============== Connect to DataBase ================
var db = mongoose.connection;
db.on('error', function(err){ console.log(err); });
db.once('open', function(){ console.log('[ XYZ ] Connected to Mongo DB'); });
// =============== Require Data Model =================
var Magazine = require('../models/magazine.js');

//*-----------------------------------------------------*
//* Reset the Magazine Database for testing purpose     *
//*-----------------------------------------------------*
// =============== Preloading Articles ================
var aList1 = {
  title: "Next Generation Tracking",
  author: "Rick Dana Barlow",
  topic: "Real Time Location System",
  abstract: "Go beyond tracking people, products and equipment",
};
var aList2 = {
  title: "Barcoding 2.0",
  author: "David Crist",
  topic: "Barcoding",
  abstract: "Better patient monitoring, better patient safety",
};
var aList3 = {
  title: "Uncovering the real total cost of ownership",
  author: "Dale Hockel / Michael Kintner",
  topic: "Strategic Directives",
  abstract: "The influence of clinical engineering",
};
var aList4 = {
  title: "Build Your Defense!",
  author: "Ron Ropp / Becky Quamen",
  topic: "Security",
  abstract: "Develop a strategic plan of action to combat cybercrime",
};
var aList5 = {
  title: "UDI: Unique Device Identifiers",
  author: "Karen Conway",
  topic: "Compliance",
  abstract: "Not just for manufacturers anymore",
};
var aList6 = {
  title: "The Drone Defender",
  author: "David Tolsky",
  topic: "Drone",
  abstract: "Conversation with 3D Robotics",
};
var aList7 = {
  title: "River Watchers",
  author: "DNed Rozell",
  topic: "Drone",
  abstract: "Drones monitor Alaska's ice floes",
};
var aList8 = {
  title: "Droned!",
  author: "Matt Boyd",
  topic: "Drone",
  abstract: "UAVs invade network TV airspace",
};
var aList9 = {
  title: "Ligth Up the Nigth",
  author: "David Tolsky",
  topic: "Drone",
  abstract: "We test three top portable ligths",
};
// =============== Uploading Magazine ================
Magazine.remove({})
.then(function(){
  console.log('[ XYZ ] Magazine Data-loading in Progress...')
  return Magazine.create({
    magazinename: "Health Management Technology",
    coverTitle: "Next Generation Tracking",
    editionPeriod: "October 2014",
    editionVolume: 35,
    editionNumber: 10,
    articleList: [aList1, aList2, aList3],
    baseLocation: "Book Shelf",
  });
})
.then(function(){
  return Magazine.create({
    magazinename: "Health Management Technology",
    coverTitle: "Build Your Defense!",
    editionPeriod: "October 2015",
    editionVolume: 36,
    editionNumber: 10,
    articleList: [aList4, aList5],
    baseLocation: "Book Shelf",
  });
})
.then(function(){
  return Magazine.create({
    magazinename: "Rotor Drone",
    coverTitle: "The Drone Defender",
    editionPeriod: "July/August 2016",
    editionVolume: 3,
    editionNumber: 3,
    articleList: [aList6, aList7],
    baseLocation: "Book Shelf",
  });
})
.then(function(){
  return Magazine.create({
    magazinename: "Rotor Drone",
    coverTitle: "Ligths Take Flight",
    editionPeriod: "September/October 2016",
    editionVolume: 3,
    editionNumber: 5,
    articleList: [aList8, aList9],
    baseLocation: "Book Shelf",
  });
})
.catch(function(err){
  console.error(err);
})
.then(function(){
  console.log('[ XYZ ] Magazine data-loading completed');
  console.log('[ XYZ ] Closing Mongo DB');
  db.close();
});
