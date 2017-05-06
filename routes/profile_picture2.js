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
  	var email;
    if ((require('./login.js').email) != undefined ) {
      email = require('./login.js').email;
    }
    else
      email = require('./signup.js').email;
    cb(null, email + '.jpg');
    console.log(email);
  }
})

var upload = multer({ storage: storage })


router.get('/', function(req, res, next) {
  var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('profile_picture2', { title: 'Profile Picture2',name122:name12 });

});

router.post('/upload',upload.any(), function(req, res) {
	res.redirect('/profile');
});

module.exports = router;
