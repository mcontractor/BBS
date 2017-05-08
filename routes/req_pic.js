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
    
    var name = require('./upload_requests.js').req_name;
    mkdirp(('public/requests/'+email+'/'+name+'/'), function(err) { 
      cb(null, 'public/requests/'+email+'/'+name+'/');
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg');
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
  res.render('req_pic', { title: 'Request Pictures',name122:name12 });

});

router.post('/upload',upload.any(), function(req, res) {
	res.redirect('/confirmation');
});

module.exports = router;
