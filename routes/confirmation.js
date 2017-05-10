var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login.js').sess;
    if(sess.email){
	  res.render('confirmation', { title: 'Confirmation',name122:sess.name });
	}

});

module.exports = router;
