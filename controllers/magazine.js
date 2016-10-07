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
    //var displayUser = req.user.username;
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
  var viewData = {title: 'New Magazine'}
  res.render('magazine/new', viewData);
  };
});

// // ROUTE :: SHOW to Display one pokemon page
// router.get('/:npn', function(req, res){
//   // - Tweak form data
//   req.params.npn = Number(req.params.npn);
//   // - Display SHOW page
//   PokemonModel.findOne({npn : req.params.npn}, function(err, onePokemon){
//     if (err) { console.log("*3*", err)};
//     if (onePokemon) {
//       var viewData = onePokemon;
//       viewData.title = onePokemon.name;
//       viewData.imageURL = `https://img.pokemondb.net/artwork/${onePokemon.name.toLowerCase()}.jpg`
//       // ------- this is not working - check it later ---START
//       //console.log("image", viewData.imageURL);
//       // if (!viewData.imageURL) { viewData.imageURL = "https://boost-rankedboost.netdna-ssl.com/wp-content/uploads/2016/07/PokeBall.png" }
//     // ------- this is not working - check it later ---END
//       res.render('pokemon/show', viewData);
//     } else {
//       res.redirect('/pokemon');
//     };
//   });
// });


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
