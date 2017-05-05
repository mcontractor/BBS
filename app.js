var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');

var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var login2 = require('./routes/login2');
var security_code = require('./routes/security_code');
var contact_us = require('./routes/contact_us');
var logout = require('./routes/logout');
var upload_ad = require('./routes/upload_ad');
var upload_requests = require('./routes/upload_requests');
var confirmation = require('./routes/confirmation');
var single_ad = require('./routes/single_ad');
var profile = require('./routes/profile');
var community = require('./routes/community');
var main = require('./routes/main');
var borrowscreen = require('./routes/borrowscreen');
var buyscreen = require('./routes/buyscreen');
var feedback = require('./routes/feedback');
var changePass = require('./routes/changePass');
var profile_picture = require('./routes/profile_picture');
var ad_pic = require('./routes/ad_pic');
var req_pic = require('./routes/req_pic');


var app = express();

var dir = __dirname;
module.exports.dir = dir;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/signup',signup);
app.use('/login',login);
app.use('/login2',login2);
app.use('/security_code',security_code);
app.use('/contact_us',contact_us);
app.use('/logout',logout);
app.use('/upload_ad',upload_ad);
app.use('/upload_requests',upload_requests);
app.use('/confirmation',confirmation);
app.use('/single_ad',single_ad);
app.use('/profile',profile);
app.use('/community',community);
app.use('/main',main);
app.use('/borrowscreen',borrowscreen);
app.use('/buyscreen',buyscreen);
app.use('/feedback',feedback);
app.use('/changePass',changePass);
app.use('/profile_picture',profile_picture);
app.use('/ad_pic',ad_pic);
app.use('/req_pic',req_pic);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
