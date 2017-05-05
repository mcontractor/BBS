var express = require('express')
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
  	var email = require('./signup.js').email;
    cb(null, email + '.jpg');
    console.log(email);
  }
})

var upload = multer({ storage: storage })


router.get('/', function(req, res, next) {
  res.render('profile_picture', { title: 'Profile Picture' });

});

router.post('/upload',upload.any(), function(req, res) {
	res.redirect('/security_code');
});

module.exports = router;
