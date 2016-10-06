//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();

//*-----------------------------------------------------*
//* Routing rules                                       *
//*-----------------------------------------------------*
router.get('/', function(req, res){
  var viewData = {title: 'Magazine Stack'}
  res.render('home', viewData);
});

module.exports = router;
