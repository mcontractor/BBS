var express = require('express')
var router = express.Router();
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');


var upload

router.get('/', function(req, res, next) {
  var sess = require('./login').sess
  if(sess.email){
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
      },
      filename: function (req, file, cb) {
        
        cb(null, sess.email + '.jpg');
        console.log(sess.email);
      }
    })

    upload = multer({ storage: storage })

    
    res.render('profile_picture2', { title: 'Profile Picture2',name122:sess.name });
    router.post('/upload',upload.any(), function(req, res) {
      res.redirect('/profile');
    });
  }
});



module.exports = router;
