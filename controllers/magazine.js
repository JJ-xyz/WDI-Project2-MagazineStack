//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();
var MagazineModel = require('../models/magazine.js');
// //*--------------------------------------------------*
// //* DATA Sources - Mongo DB it is in app             *
// //*--------------------------------------------------*
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/magazine');
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', function(err){ console.log(err); });
// db.once('open', function(){ console.log('[ XYZ ] Connected to Mongo DB'); });

//*-----------------------------------------------------*
//* ROUTE :: INDEX :: Browse the index                  *
//*-----------------------------------------------------*
router.get('/', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
    MagazineModel.find({}, function(err, allMagazine){
      if (err) { console.log("*1*", err)};
      var viewData = {
        magazineIndex: allMagazine,
        title: 'Browse Magazine',
        actualUser: req.user.username
      };
      var searchString = req.query.searchString;
      console.log("buscame", searchString);
      if (searchString) {
         viewData.magazineIndex = allMagazine.filter(function(magazine){
           return magazine.magazinename.toLowerCase().includes(searchString.toLowerCase());
         });
       };
      res.render('magazine/index', viewData);
    });
  }
});

//*-----------------------------------------------------*
//* ROUTE :: NEW :: Create new Magazine record          *
//*-----------------------------------------------------*

// // ROUTE :: Create the NEW pokemon
// router.post('/', function(req, res){
//   // - Tweak form data
//   req.body.npn = Number(req.body.npn);
//   // - Create Document... record...
//   PokemonModel.create(req.body, function(err, onePokemon){
//     if (err) {
//       console.log("*2*", err);
//       res.redirect('/pokemon/new');
//     } else {
//       res.redirect('/pokemon');
//     }
//   });
// });

//*-----------------------------------------------------*
//* ROUTE :: NEW :: Display new empty magazine page     *
//*-----------------------------------------------------*
router.get('/new', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
  var viewData = {title: 'New Magazine', actualUser: req.user.username}
  res.render('magazine/new', viewData);
  };
});

//*-----------------------------------------------------*
//* ROUTE :: SHOW :: Display ONE magazine page          *
//*-----------------------------------------------------*
router.get('/:magId', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
    MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
      if (err) { console.log("*3*", err)};
      if (oneMagazine) {
        var viewData = oneMagazine;
        viewData.title = "Magazine";
        viewData.actualUser = req.user.username;
        res.render('magazine/show', viewData);
      } else {
        res.redirect('/magazine');
      };
    });
  };




});


// // ROUTE :: UPDATE the pokemon
// router.patch('/:npn', function(req, res){
//   // Tweak form data
//   req.body.npn = Number(req.body.npn);
//   if (req.body.typeTwo === 'None') {req.body.typeTwo = '';}
//   // Update mongo DB
//   PokemonModel.findOneAndUpdate({npn : req.body.npn}, req.body, function(err, onePokemon){
//     if (err) {
//       console.log("*4*", err);
//       res.redirect(`/pokemon/${req.params.npn}/edit`);
//       //res.redirect("pokemon/"+req.body.npn+"/edit")
//     } else {
//       res.redirect(`/pokemon/${req.params.npn}`);
//     };
//   });
// });

// // ROUTE :: DESTROY to Display EDIT page
// router.delete('/:npn', function(req, res){
//   // Tweak form data
//   req.params.npn = Number(req.params.npn);
//   //DS.destroyPokemon(Number(req.params.npn));
//   // delete Document
//   PokemonModel.remove({npn : req.params.npn}, function(err, onePokemon){
//     if (err) {
//       console.log("*5*", err);
//       res.redirect(`/pokemon/${req.params.npn}/edit`);
//     } else {
//       res.redirect("/pokemon");
//     };
//   });
// });

//*-----------------------------------------------------*
//* ROUTE :: EDIT :: Display EDIT a magazine page       *
//*-----------------------------------------------------*
// // ROUTE :: EDIT to Display EDIT page
// router.get('/:npn/edit', function(req, res){
//   // Tweak form data
//   req.params.npn = Number(req.params.npn);
//     // read mongo DB
//   PokemonModel.findOne({npn : req.params.npn}, function(err, onePokemon){
//     if (err) { console.log("*3*", err)};
//     if (onePokemon) {
//       var viewData = {
//         pokemon: onePokemon,
//         types: DS.getTypes(),
//         regions: DS.getRegions(),
//         title: `${onePokemon.name} (edit)`
//       };
//       res.render('pokemon/edit', viewData);
//     } else {
//       res.redirect('/pokemon');
//     };
//   });
// });

module.exports = router;
