//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();
var MagazineModel = require('../models/magazine.js');

// //*-----------------------------------------------------*
// //* ROUTE :: INDEX :: Browse the index                  *
// //*-----------------------------------------------------*
// router.get('/', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.find({}, function(err, allMagazine){
//       if (err) { console.log("*1*", err)};
//       var viewData = {
//         magazineIndex: allMagazine,
//         title: 'Browse Magazine',
//         actualUser: req.user.username
//       };
//       var searchString = req.query.searchString;
//       console.log("buscame", searchString);
//       if (searchString) {
//          viewData.magazineIndex = allMagazine.filter(function(magazine){
//            return magazine.magazinename.toLowerCase().includes(searchString.toLowerCase());
//          });
//        };
//       res.render('magazine/index', viewData);
//     });
//   }
// });

// //*-----------------------------------------------------*
// //* ROUTE :: NEW :: Display new empty magazine page     *
// //*-----------------------------------------------------*
// router.get('/new', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//   var viewData = {title: 'New Magazine', actualUser: req.user.username}
//   res.render('magazine/new', viewData);
//   };
// });

// //*-----------------------------------------------------*
// //* ROUTE :: CREATE :: Create new record from NEW       *
// //*-----------------------------------------------------*
// router.post('/', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.create(req.body, function(err, oneMagazine){
//       if (err) {
//         console.log("*2*", err);
//         res.redirect('/magazine/new');
//       } else {
//         res.redirect('/magazine');
//       }
//     });
//   };
// });

//*-----------------------------------------------------*
//* ROUTE :: SHOW :: Display ONE article page           *
//*-----------------------------------------------------*
router.get('/:magId/:artId', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
    MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
      if (err) { console.log("*3*", err)};
      if (oneMagazine) {
        var z = oneMagazine.articleList.findIndex(function(article) {
          return article._id == req.params.artId;
        });
        var viewData = {
          mag: oneMagazine,
          title: "Article",
          art: oneMagazine.articleList[z],
          actualUser: req.user.username };
        res.render('article/show', viewData);
      } else {
        res.redirect('/magazine');
      };
    });
  };
});

// //*-----------------------------------------------------*
// //* ROUTE :: EDIT :: Display EDIT a magazine page       *
// //*-----------------------------------------------------*
// router.get('/:magId/edit', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) { console.log("*4*", err)};
//       if (oneMagazine) {
//         var viewData = {
//           mag: oneMagazine,
//           actualUser: req.user.username,
//           title: "Magazine (edit)" };
//         res.render('magazine/edit', viewData);
//       } else {
//         res.redirect('/magazine');
//       };
//     });
//   };
// });

// //*-----------------------------------------------------*
// //* ROUTE :: UPDATE :: Patch/Update magazine from EDIT  *
// //*-----------------------------------------------------*
// router.patch('/:magId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOneAndUpdate({_id : req.params.magId}, req.body, function(err, oneMagazine){
//       if (err) {
//         console.log("*5*", err);
//         res.redirect(`/magazine/${req.params.magId}/edit`);
//         //res.redirect("magazine/"+req.body.magId+"/edit")
//       } else {
//         res.redirect(`/magazine/${req.params.magId}`);
//       };
//     });
//   };
// });

// //*-----------------------------------------------------*
// //* ROUTE :: DESTROY :: Delete magazine from EDIT       *
// //*-----------------------------------------------------*
// router.delete('/:magId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.remove({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) {
//         console.log("*6*", err);
//         res.redirect(`/magazine/${req.params.magId}/edit`);
//       } else {
//         console.log("Deleting",req.params.magId, "with", req.body);
//         res.redirect("/magazine");
//       };
//     });
//   };
// });

module.exports = router;
