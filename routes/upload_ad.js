var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload_ad', { title: 'Upload Ad' });

});

module.exports = router;
