var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });

});

router.post('/submit',function(req,res,next){
	console.log(req.body.email + " " + req.body.password);
	res.redirect('/main');
})

module.exports = router;
