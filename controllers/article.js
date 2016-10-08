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

//*-----------------------------------------------------*
//* ROUTE :: EDIT :: Display EDIT article from SHOW     *
//*-----------------------------------------------------*
router.get('/:magId/:artId/edit', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
    MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
      if (err) { console.log("*4*", err)};
      if (oneMagazine) {
        var z = oneMagazine.articleList.findIndex(function(article) {
          return article._id == req.params.artId;
        });
        var viewData = {
          mag: oneMagazine,
          actualUser: req.user.username,
          art: oneMagazine.articleList[z],
          title: "Article (edit)" };
        res.render('article/edit', viewData);
      } else {
        res.redirect('/magazine');
      };
    });
  };
});

//*-----------------------------------------------------*
//* ROUTE :: UPDATE :: Patch/Update article from EDIT  *
//*-----------------------------------------------------*
router.patch('/:magId/:artId', function(req, res){
  if (!req.user) {
    var viewData = {title: 'Magazine Login'};
    res.render('sec/login', viewData);
  } else {
    // ============= Asking for a promise ============
    console.log("[ ### ] Promise started");
    MagazineModel.findOne({_id : req.params.magId}).exec()
    .then(function(oneMagazine){
      console.log("[ ### ] findOne",oneMagazine);
      //if (oneMagazine) {  // <-- not necesary it would go thru .catch
        var z = oneMagazine.articleList.findIndex(function(article) {
          return article._id == req.params.artId;
        });
      console.log("[ ### ] findIndex",z);
        //oneMagazine.articleList[z] = req.body;  // <-- this option change the ObjectId of the element
        oneMagazine.articleList[z].title = req.body.title;
        oneMagazine.articleList[z].author = req.body.author;
        oneMagazine.articleList[z].topic = req.body.topic;
        oneMagazine.articleList[z].abstract = req.body.abstract;
      //}
      console.log("[ ### ] saving",oneMagazine);
      return oneMagazine.save();
    })
    .then(function(oneMagazine) {
      console.log("[ ### ] saved",oneMagazine);
      res.redirect(`/article/${req.params.magId}/${req.params.artId}`);
    })
    .catch(function(err) {
      console.log("*5*", err);
      res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
    });
  };
});
// //--------------- cutting line ---------------------
//     ,
//       function(err, oneMagazine){
//       if (err) {
//         console.log("*5*", err);
//         res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//       } else {
//         if (oneMagazine) {
//           var z = oneMagazine.articleList.findIndex(function(article) {
//             return article._id == req.params.artId;
//           });
//           console.log("array", oneMagazine.articleList[z]);
//           console.log("paged", req.body.title);
//           // oneMagazine.articleList[z].title = req.body.title;
//           // oneMagazine.articleList[z].author = req.body.author;
//           // oneMagazine.articleList[z].topic = req.body.topic;
//           // oneMagazine.articleList[z].abstract = req.body.abstract;
//           oneMagazine.articleList[z] = req.body;
//           // MagazineModel.save();
//           MagazineModel.save(function (err, oneMagazine) {
//             if (err) {
//               console.log("*5b*", err);
//               res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//             } else {
//               res.redirect(`article/${req.params.magId}/${req.params.artId}`);
//             }
//           // if (err) {
//           //   console.log("*5b*", err);
//           //   res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//           // }
//           // res.redirect(`article/${req.params.magId}/${req.params.artId}`);
//           });
//         };
//       };
//     });
//   };
// });

// //*-----------------------------------------------------*
// //* NO-ROUTE :: UPDATE :: Patch/Update article from EDIT*
// //*-----------------------------------------------------*
// router.patch('/:magId/:artId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) {
//         console.log("*5*", err);
//         res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//       } else {
//         if (oneMagazine) {
//           var z = oneMagazine.articleList.findIndex(function(article) {
//             return article._id == req.params.artId;
//           });
//           console.log("array", oneMagazine.articleList[z]);
//           console.log("paged", req.body.title);
//           // oneMagazine.articleList[z].title = req.body.title;
//           // oneMagazine.articleList[z].author = req.body.author;
//           // oneMagazine.articleList[z].topic = req.body.topic;
//           // oneMagazine.articleList[z].abstract = req.body.abstract;
//           oneMagazine.articleList[z] = req.body;
//           // MagazineModel.save();
//           MagazineModel.save(function (err, oneMagazine) {
//             if (err) {
//               console.log("*5b*", err);
//               res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//             } else {
//               res.redirect(`article/${req.params.magId}/${req.params.artId}`);
//             }
//           // if (err) {
//           //   console.log("*5b*", err);
//           //   res.redirect(`/article/${req.params.magId}/${req.params.artId}/edit`);
//           // }
//           // res.redirect(`article/${req.params.magId}/${req.params.artId}`);
//           });
//         };
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
