var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('profile', { title: 'Profile', name122:name12 });

});

module.exports = router;
