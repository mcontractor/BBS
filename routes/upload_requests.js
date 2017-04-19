var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload_requests', { title: 'Upload A Request' });

});

module.exports = router;
