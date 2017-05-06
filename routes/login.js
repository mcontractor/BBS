var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });

});


router.post('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('users').find({'email':req.body.email});
	    var email = req.body.email;
	    module.exports.email = email;

	    cursor.each(function(err, doc) {
	    	console.log(doc)
	    	if(doc != null){
	    		if(doc.email == email && doc.password == req.body.password){
	    			var name12 = doc.name;
					module.exports.name12 = name12;
					res.redirect('/main');
	    		}
	    		else{

					res.redirect('/login2');
	    		}
	    	}

	    });
	}); 	


})

module.exports = router;
