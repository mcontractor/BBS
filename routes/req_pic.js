var express = require('express')
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');
var mkdirp = require('mkdirp');






router.get('/', function(req, res, next) {
  var sess = require('./login').sess
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var name = require('./upload_requests.js').req_name;
      mkdirp(('public/requests/'+sess.email+'/'+name+'/'), function(err) { 
        cb(null, 'public/requests/'+sess.email+'/'+name+'/');
      });
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '.jpg');
    }
  })
  var upload = multer({ storage: storage })
  res.render('req_pic', { title: 'Request Pictures',name122:sess.name });
  router.post('/upload',upload.any(), function(req, res) {
    res.redirect('/confirmation');
  });
});



module.exports = router;
