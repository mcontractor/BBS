var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login.js').sess;
    if(sess.email){
	res.render('feedback', { title: 'feedback', name122:sess.name });
	}
	else{
		res.redirect('/')
	}

});

module.exports = router;
