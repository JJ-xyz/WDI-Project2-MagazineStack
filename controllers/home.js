//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();

//*-----------------------------------------------------*
//* Routing rules                                       *
//*-----------------------------------------------------*
router.get('/', function(req, res){
  if (!req.user) {
    var displayUser = "";
  } else {
    var displayUser = req.user.username;
  }
  var viewData = {
    title: 'Magazine Stack',
    actualUser: displayUser };

  res.render('home', viewData);
});

module.exports = router;
