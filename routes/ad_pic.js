var express = require('express')
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var email;
    if ((require('./login.js').email) != undefined ) {
      email = require('./login.js').email;
    }
    else
      email = require('./signup.js').email;
    
    var name = require('./upload_ad.js').ad_name;
    mkdirp(('ads/'+email+'/'+name+'/'), function(err) { 
    });
    cb(null, 'ads/'+email+'/'+name+'/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg');
  }
})

var upload = multer({ storage: storage })


router.get('/', function(req, res, next) {
  res.render('ad_pic', { title: 'Ad Pictures' });

});

router.post('/upload',upload.any(), function(req, res) {
	res.redirect('/confirmation');
});

module.exports = router;
