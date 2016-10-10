//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
// =================== Express =======================
var express = require('express');
var app = express();
// ============ Serve Static Assets ==================
app.use(express.static(__dirname + '/public'));
// ============= fomrs handlers ======================
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
// ================ Debugging ========================
pry = require('pryjs');
var logger = require('morgan');
app.use(logger('dev'));
// ============= Express + Handlebars ================
var hbs = require('hbs');
app.set("view engine", "hbs");
//require('handlebars-form-helpers').register(hbs.handlebars);

//*-----------------------------------------------------*
//* DATA Sources Initialization - Mongo DB              *
//*-----------------------------------------------------*
var mongoose = require('mongoose');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/magazine';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function(err){ console.log(err); });
db.once('open', function(){ console.log('[ XYZ ] Connected to Mongo DB'); });

//*-----------------------------------------------------*
//* MODULES definition - Midleware                      *
//*-----------------------------------------------------*
var UserModel = require('./models/user.js');

//*-----------------------------------------------------*
//* PASSPORT definition - Strategy                      *
//*-----------------------------------------------------*
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//*-----------------------------------------------------*
//* PASSPORT Midleware configuration                    *
//*-----------------------------------------------------*
// =========== Configure passport sessions =============
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

//*-----------------------------------------------------*
//* Routing rules for Midleware modules                 *
//*-----------------------------------------------------*
app.use('/', require('./controllers/home.js'));
app.use('/magazine', require('./controllers/magazine.js'));
app.use('/article', require('./controllers/article.js'));
app.use('/sec', require('./controllers/sec.js'));
app.use('/sh!t-no-data', require('./lib/data-init.js'))

app.listen(process.env.PORT || 3000);
