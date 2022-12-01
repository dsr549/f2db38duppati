"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
  Account.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }

    return done(null, user);
  });
}));

require('dotenv').config();

var connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //Get the default connection

var db = mongoose.connection; //Bind connection to error event

db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});

var indexRouter = require('./routes/index');

var resourceRouter = require('./routes/resource');

var usersRouter = require('./routes/users');

var horseRouter = require('./routes/horse');

var squirrelRouter = require('./routes/squirrel');

var gridbuildRouter = require('./routes/gridbuild');

var selectorRouter = require('./routes/selector');

var squirrel = require("./models/squirrel"); //-const squirrel = require('./models/squirrel');


function recreateDB() {
  var instance1, instance2, instance3;
  return regeneratorRuntime.async(function recreateDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(squirrel.deleteMany());

        case 2:
          instance1 = new squirrel({
            squirrel_color: "brown",
            squirrel_breed: "Eastern Gray Squirrel",
            squirrel_price: 1200
          });
          instance1.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("First object saved");
          });
          instance2 = new squirrel({
            squirrel_color: "red",
            squirrel_breed: "Western Gray Squirrel",
            squirrel_price: 2000
          });
          instance2.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("second object saved");
          });
          instance3 = new squirrel({
            squirrel_color: "brown",
            squirrel_breed: "Arizona Gray Squirrel",
            squirrel_price: 1800
          });
          instance3.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Third object saved");
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var reseed = true;

if (reseed) {
  recreateDB();
}

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/horse', horseRouter);
app.use('/squirrel', squirrelRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter); // passport config
// Use the existing connection
// The Account model

var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser()); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;