var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	req.session.destroy(function(err) {
	  if(err) {
	    console.log(err);
	  } else {
	    res.render('logout', { title: 'Logout' });
	  }
	});
  

});

module.exports = router;
