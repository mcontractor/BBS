var express = require('express')
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');
var mkdirp = require('mkdirp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var email = require('./login.js').email;
    var name = require('./upload_requests.js').req_name;
    mkdirp(('requests/'+email+'/'+name+'/'), function(err) { 
    });
    cb(null, 'requests/'+email+'/'+name+'/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg');
  }
})

var upload = multer({ storage: storage })


router.get('/', function(req, res, next) {
  res.render('req_pic', { title: 'Request Pictures' });

});

router.post('/upload',upload.any(), function(req, res) {
	res.redirect('/confirmation');
});

module.exports = router;
