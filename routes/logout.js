var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login.js').sess;

    sess.secret= 'secret',
    sess.name= false,
    sess.email= false, // connect-mongo session store
    sess.proxy= true,
    sess.resave= true,
    sess.saveUninitialized= true

    res.render('logout', { title: 'Logout' });

});

module.exports = router;
